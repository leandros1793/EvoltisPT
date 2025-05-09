
# Proyecto Técnico: ABM con Angular 13+ y .NET 6+

Este proyecto es una prueba técnica que implementa un sistema completo de ABM (Alta, Baja, Modificación) de clientes, con un frontend en Angular 13+ y un backend en .NET 6+. Cumple con los requerimientos funcionales y técnicos solicitados por Evoltis.

## Índice

- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Requerimientos](#requerimientos)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
- [Frontend - Angular 13+](#frontend---angular-13)
  - [Dependencias](#dependencias)
  - [Estructura del Proyecto](#estructura-del-proyecto)
  - [Formulario Reactivo](#formulario-reactivo)
  - [Tabla con Filtros (PrimeNG)](#tabla-con-filtros-primeng)
  - [Estado Global con NGRX](#estado-global-con-ngrx)
- [Backend - .NET 6+](#backend---net-6)
  - [Dependencias](#dependencias-1)
  - [Estructura del Proyecto](#estructura-del-proyecto-1)
  - [Repository Pattern](#repository-pattern)
  - [Service Pattern](#service-pattern)
  - [DTOs y AutoMapper](#dtos-y-automapper)
  - [EF Core y MySQL](#ef-core-y-mysql)
  - [Inyección de Dependencias](#inyección-de-dependencias)
- [Extras (Opcional)](#extras-opcional)
- [Instrucciones de Uso](#instrucciones-de-uso)
- [Preguntas Técnicas Frecuentes](#preguntas-técnicas-frecuentes)

---

## Tecnologías Utilizadas

### Frontend
- Angular 13+
- PrimeNG
- NGRX
- RxJS
- ngrx-forms (opcional)
- TypeScript

### Backend
- .NET 6
- Entity Framework Core 8
- MySQL
- AutoMapper
- FluentValidation (opcional)
- Patrón Repository y Service

---

## Requerimientos

- ABM completo (Clientes)
- Formularios reactivos
- Tabla con filtros (PrimeNG)
- Redux (NGRX)
- AutoMapper y DTOs
- Base de datos MySQL

---

## Arquitectura del Proyecto

```
backend/
  ├── Controllers/
  ├── DTOs/
  ├── Entities/
  ├── Repositories/
  ├── Services/
  └── Program.cs

frontend/
  ├── src/app/
      ├── components/
      ├── services/
      ├── models/
      ├── store/ (NGRX)
      └── app.module.ts
```

---

## Frontend - Angular 13+

### Dependencias
```bash
npm install primeng primeicons @ngrx/store @ngrx/effects @ngrx/entity @ngrx/store-devtools
```

### Estructura del Proyecto
- `clientes/` contiene los componentes de listado, formulario y detalles
- `store/` contiene actions, reducers, selectors y efectos para manejar el estado

### Formulario Reactivo
Usa `FormBuilder`, validaciones y estados de formularios en Angular.

### Tabla con Filtros (PrimeNG)
```html
<p-table [value]="clientes" [paginator]="true" [rows]="10" [globalFilterFields]="['nombre', 'email']">
  ...
</p-table>
```

### Estado Global con NGRX
- Actions: `loadClientes`, `addCliente`, etc.
- Reducers: manejan el estado inmutable
- Selectors: para leer datos
- Effects: llaman al backend

---

## Backend - .NET 6+

### Dependencias
```bash
dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Pomelo.EntityFrameworkCore.MySql
dotnet add package FluentValidation.AspNetCore
```

### Estructura del Proyecto
- `Cliente.cs`: entidad
- `ClienteDto.cs`, `CreateClienteDto.cs`: DTOs
- `IClienteRepository.cs`, `ClienteRepository.cs`: patrón repositorio
- `IClienteService.cs`, `ClienteService.cs`: patrón servicio
- `ClienteController.cs`: controlador con endpoints

### Repository Pattern
Encapsula el acceso a datos usando EF Core y métodos como:
```csharp
Task<IEnumerable<Cliente>> GetAllAsync();
Task<Cliente> CreateAsync(Cliente cliente);
```

### Service Pattern
Maneja la lógica de negocio y trabaja con DTOs y AutoMapper.

### DTOs y AutoMapper
```csharp
CreateMap<Cliente, ClienteDto>();
CreateMap<CreateClienteDto, Cliente>();
```

### EF Core y MySQL
`AppDbContext` configura las entidades y conexión.

### Inyección de Dependencias
Registrado en `Program.cs`:
```csharp
builder.Services.AddScoped<IClienteRepository, ClienteRepository>();
builder.Services.AddScoped<IClienteService, ClienteService>();
```

---

## Extras (Opcional)

- Se incluye `ngrx-forms` para gestionar el estado de los formularios.
- Uso de `FluentValidation` para validar DTOs en el backend.
- Fluent API de EF Core para personalizar relaciones y restricciones.

---

## Instrucciones de Uso

### Backend
```bash
cd backend
dotnet ef migrations add InitialCreate
dotnet ef database update
dotnet run
```

### Frontend
```bash
cd frontend
npm install
ng serve
```

---

## Preguntas Técnicas Frecuentes

**¿Por qué usar NGRX?**  
Para manejar estados complejos, asincronismo y escalabilidad.

**¿Cuál es el beneficio del patrón Repository?**  
Aísla el acceso a datos, permite testear y seguir el principio de responsabilidad única.

**¿Por qué usar DTOs?**  
Para desacoplar las entidades de la base de datos del modelo expuesto al cliente.

**¿Qué ventajas ofrece AutoMapper?**  
Reduce código repetitivo al mapear objetos automáticamente.

**¿Se puede agregar seguridad?**  
Sí, mediante autenticación JWT y políticas en ASP.NET Core.

---

## Licencia

Este proyecto es solo para fines educativos y de evaluación técnica.
