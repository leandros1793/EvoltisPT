// Services/IClienteService.cs
using TechnicalTestBackend.API.Entities.Cliente.cs;
using AutoMapper;
using TechnicalTestBackend.API.DTOs;

public interface IClienteService
{
    Task<IEnumerable<ClienteDto>> GetAllAsync();
    Task<ClienteDto> GetByIdAsync(int id);
    Task<ClienteDto> CreateAsync(CreateClienteDto createClienteDto);
    Task UpdateAsync(int id, UpdateClienteDto updateClienteDto);
    Task DeleteAsync(int id);
}

// Services/ClienteService.cs
public class ClienteService : IClienteService
{
    private readonly IClienteRepository _repository;
    private readonly IMapper _mapper;

    public ClienteService(IClienteRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<ClienteDto>> GetAllAsync()
    {
        var clientes = await _repository.GetAllAsync();
        return _mapper.Map<IEnumerable<ClienteDto>>(clientes);
    }

    public async Task<ClienteDto> GetByIdAsync(int id)
    {
        var cliente = await _repository.GetByIdAsync(id);
        return _mapper.Map<ClienteDto>(cliente);
    }

    public async Task<ClienteDto> CreateAsync(CreateClienteDto createClienteDto)
    {
        var cliente = _mapper.Map<Cliente>(createClienteDto);
        cliente = await _repository.CreateAsync(cliente);
        return _mapper.Map<ClienteDto>(cliente);
    }

    public async Task UpdateAsync(int id, UpdateClienteDto updateClienteDto)
    {
        var cliente = await _repository.GetByIdAsync(id);
        if (cliente == null)
            throw new KeyNotFoundException($"Cliente con ID {id} no encontrado");

        _mapper.Map(updateClienteDto, cliente);
        await _repository.UpdateAsync(cliente);
    }

    public async Task DeleteAsync(int id)
    {
        await _repository.DeleteAsync(id);
    }
}