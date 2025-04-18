// src/app/store/cliente/cliente.actions.ts

import { createAction, props } from '@ngrx/store';
import { Cliente, CreateCliente, UpdateCliente } from '../../models/cliente.model';

export const loadClientes = createAction('[Cliente] Load Clientes');
export const loadClientesSuccess = createAction(
  '[Cliente] Load Clientes Success',
  props<{ clientes: Cliente[] }>()
);
export const loadClientesFailure = createAction(
  '[Cliente] Load Clientes Failure',
  props<{ error: any }>()
);

export const loadCliente = createAction(
  '[Cliente] Load Cliente',
  props<{ id: number }>()
);
export const loadClienteSuccess = createAction(
  '[Cliente] Load Cliente Success',
  props<{ cliente: Cliente }>()
);
export const loadClienteFailure = createAction(
  '[Cliente] Load Cliente Failure',
  props<{ error: any }>()
);

export const createCliente = createAction(
  '[Cliente] Create Cliente',
  props<{ cliente: CreateCliente }>()
);
export const createClienteSuccess = createAction(
  '[Cliente] Create Cliente Success',
  props<{ cliente: Cliente }>()
);
export const createClienteFailure = createAction(
  '[Cliente] Create Cliente Failure',
  props<{ error: any }>()
);

export const updateCliente = createAction(
  '[Cliente] Update Cliente',
  props<{ id: number, cliente: UpdateCliente }>()
);
export const updateClienteSuccess = createAction(
  '[Cliente] Update Cliente Success',
  props<{ cliente: Cliente }>()
);
export const updateClienteFailure = createAction(
  '[Cliente] Update Cliente Failure',
  props<{ error: any }>()
);

export const deleteCliente = createAction(
  '[Cliente] Delete Cliente',
  props<{ id: number }>()
);
export const deleteClienteSuccess = createAction(
  '[Cliente] Delete Cliente Success',
  props<{ id: number }>()
);
export const deleteClienteFailure = createAction(
  '[Cliente] Delete Cliente Failure',
  props<{ error: any }>()
);