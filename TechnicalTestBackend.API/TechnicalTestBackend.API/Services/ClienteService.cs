using Microsoft.EntityFrameworkCore;
using TechnicalTestBackend.API.Data;
using TechnicalTestBackend.API.Entities;
using TechnicalTestBackend.API.Entities.Cliente.cs;
using TechnicalTestBackend.API.DTOs;


namespace TechnicalTestBackend.API.Services
{
    public class ClienteService : IClienteService
    {
        private readonly AppDbContext _context;

        public ClienteService(AppDbContext context)
        {
            _context = context;
        }

        public List<Cliente> GetClientes()
        {
            // Este método sincrónico puede mantenerse así si lo necesitás
            return _context.Clientes.ToList();
        }

        public Cliente GetClienteById(int id)
        {
            return _context.Clientes.FirstOrDefault(c => c.Id == id);
        }

        public void AddCliente(Cliente cliente)
        {
            _context.Clientes.Add(cliente);
            _context.SaveChanges();
        }

        // Métodos asincrónicos con DTOs

        public async Task<IEnumerable<ClienteDto>> GetAllAsync()
        {
            return await _context.Clientes
                .Select(c => new ClienteDto
                {
                    Id = c.Id,
                    Nombre = c.Nombre,
                    Apellido = c.Apellido,
                    Email = c.Email,
                    Telefono = c.Telefono,
                    Direccion = c.Direccion,
                    Activo = c.Activo
                })
                .ToListAsync();
        }

        public async Task<ClienteDto> GetByIdAsync(int id)
        {
            var cliente = await _context.Clientes.FindAsync(id);

            if (cliente == null) return null;

            return new ClienteDto
            {
                Id = cliente.Id,
                Nombre = cliente.Nombre,
                Apellido = cliente.Apellido,
                Email = cliente.Email,
                Telefono = cliente.Telefono,
                Direccion = cliente.Direccion,
                Activo = cliente.Activo
            };
        }

        public async Task<ClienteDto> CreateAsync(CreateClienteDto dto)
        {
            var cliente = new Cliente
            {
                Nombre = dto.Nombre,
                Apellido = dto.Apellido,
                Email = dto.Email,
                Telefono = dto.Telefono,
                Direccion = dto.Direccion,
                Activo = dto.Activo
            };

            _context.Clientes.Add(cliente);
            await _context.SaveChangesAsync();

            return new ClienteDto
            {
                Id = cliente.Id,
                Nombre = cliente.Nombre,
                Apellido = cliente.Apellido,
                Email = cliente.Email,
                Telefono = cliente.Telefono,
                Direccion = cliente.Direccion,
                Activo = cliente.Activo
            };
        }

        public async Task UpdateAsync(int id, UpdateClienteDto dto)
        {
            var cliente = await _context.Clientes.FindAsync(id);

            if (cliente == null) return;

            cliente.Nombre = dto.Nombre;
            cliente.Apellido = dto.Apellido;
            cliente.Email = dto.Email;
            cliente.Telefono = dto.Telefono;
            cliente.Direccion = dto.Direccion;
            cliente.Activo = dto.Activo;

            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var cliente = await _context.Clientes.FindAsync(id);

            if (cliente == null) return;

            _context.Clientes.Remove(cliente);
            await _context.SaveChangesAsync();
        }
    }
}
