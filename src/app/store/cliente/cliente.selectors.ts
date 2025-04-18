// src/app/store/cliente/cliente.selectors.ts

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClienteState } from './cliente.reducer';

export const selectClienteState = createFeatureSelector<ClienteState>('cliente');

export const selectAllClientes = createSelector(
  selectClienteState,
  (state: ClienteState) => state.clientes
);

export const selectCliente = createSelector(
  selectClienteState,
  (state: ClienteState) => state.cliente
);

export const selectClienteLoading = createSelector(
  selectClienteState,
  (state: ClienteState) => state.loading
);

export const selectClienteError = createSelector(
  selectClienteState,
  (state: ClienteState) => state.error
);