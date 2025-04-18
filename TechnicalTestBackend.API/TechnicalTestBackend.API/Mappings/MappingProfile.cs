// Mappings/MappingProfile.cs
using AutoMapper;
using TechnicalTestBackend.API.DTOs;
using TechnicalTestBackend.API.Entities.Cliente.cs;


namespace TechnicalTestBackend.API.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Cliente -> ClienteDto
            CreateMap<Cliente, ClienteDto>();

            // ClienteCreateDto -> Cliente
            CreateMap<CreateClienteDto, Cliente>();

            // ClienteUpdateDto -> Cliente
            CreateMap<UpdateClienteDto, Cliente>();
        }
    }
}