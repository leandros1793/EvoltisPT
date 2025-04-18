// src/app/store/cliente/cliente.reducer.ts

import { createReducer, on } from '@ngrx/store';
import { Cliente } from '../../models/cliente.model';
import * as ClienteActions from './cliente.actions';

export interface ClienteState {
  clientes: Cliente[];
  cliente: Cliente | null;
  loading: boolean;
  error: any;
}

export const initialState: ClienteState = {
  clientes: [],
  cliente: null,
  loading: false,
  error: null
};

export const clienteReducer = createReducer(
  initialState,
  on(ClienteActions.loadClientes, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ClienteActions.loadClientesSuccess, (state, { clientes }) => ({
    ...state,
    clientes,
    loading: false
  })),
  on(ClienteActions.loadClientesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  
  on(ClienteActions.loadCliente, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ClienteActions.loadClienteSuccess, (state, { cliente }) => ({
    ...state,
    cliente,
    loading: false
  })),
  on(ClienteActions.loadClienteFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  
  on(ClienteActions.createCliente, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ClienteActions.createClienteSuccess, (state, { cliente }) => ({
    ...state,
    clientes: [...state.clientes, cliente],
    loading: false
  })),
  on(ClienteActions.createClienteFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  
  on(ClienteActions.updateCliente, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ClienteActions.updateClienteSuccess, (state, { cliente }) => ({
    ...state,
    clientes: state.clientes.map(c => c.id === cliente.id ? cliente : c),
    cliente: cliente,
    loading: false
  })),
  on(ClienteActions.updateClienteFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  
  on(ClienteActions.deleteCliente, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ClienteActions.deleteClienteSuccess, (state, { id }) => ({
    ...state,
    clientes: state.clientes.filter(c => c.id !== id),
    loading: false
  })),
  on(ClienteActions.deleteClienteFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);