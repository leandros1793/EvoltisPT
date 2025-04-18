

export interface Cliente {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    direccion: string;
    activo: boolean;
    fechaRegistro: Date;
  }
  
  export interface CreateCliente {
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    direccion: string;
    activo: boolean;
  }
  
  export interface UpdateCliente {
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    direccion: string;
    activo: boolean;
  }