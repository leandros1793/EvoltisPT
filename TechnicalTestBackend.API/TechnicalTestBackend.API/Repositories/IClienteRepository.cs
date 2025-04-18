// Repositories/IClienteRepository.cs
using Microsoft.EntityFrameworkCore;
using TechnicalTestBackend.API.Data;
using TechnicalTestBackend.API.Entities.Cliente.cs;

public interface IClienteRepository
{
    Task<IEnumerable<Cliente>> GetAllAsync();
    Task<Cliente> GetByIdAsync(int id);
    Task<Cliente> CreateAsync(Cliente cliente);
    Task UpdateAsync(Cliente cliente);
    Task DeleteAsync(int id);
}

// Repositories/ClienteRepository.cs
