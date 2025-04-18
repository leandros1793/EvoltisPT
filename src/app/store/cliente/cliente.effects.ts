// src/app/store/cliente/cliente.effects.ts

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, concatMap } from 'rxjs/operators';
import { ClienteService } from '../../services/cliente.service';
import * as ClienteActions from './cliente.actions';

@Injectable()
export class ClienteEffects {
  
  loadClientes$ = createEffect(() => this.actions$.pipe(
    ofType(ClienteActions.loadClientes),
    mergeMap(() => this.clienteService.getClientes()
      .pipe(
        map(clientes => ClienteActions.loadClientesSuccess({ clientes })),
        catchError(error => of(ClienteActions.loadClientesFailure({ error })))
      ))
    )
  );

  loadCliente$ = createEffect(() => this.actions$.pipe(
    ofType(ClienteActions.loadCliente),
    mergeMap(({ id }) => this.clienteService.getClienteById(id)
      .pipe(
        map(cliente => ClienteActions.loadClienteSuccess({ cliente })),
        catchError(error => of(ClienteActions.loadClienteFailure({ error })))
      ))
    )
  );

  createCliente$ = createEffect(() => this.actions$.pipe(
    ofType(ClienteActions.createCliente),
    concatMap(({ cliente }) => this.clienteService.createCliente(cliente)
      .pipe(
        map(newCliente => ClienteActions.createClienteSuccess({ cliente: newCliente })),
        catchError(error => of(ClienteActions.createClienteFailure({ error })))
      ))
    )
  );

  updateCliente$ = createEffect(() => this.actions$.pipe(
    ofType(ClienteActions.updateCliente),
    concatMap(({ id, cliente }) => this.clienteService.updateCliente(id, cliente)
      .pipe(
        map(updatedCliente => ClienteActions.updateClienteSuccess({ cliente: updatedCliente })),
        catchError(error => of(ClienteActions.updateClienteFailure({ error })))
      ))
    )
  );

  deleteCliente$ = createEffect(() => this.actions$.pipe(
    ofType(ClienteActions.deleteCliente),
    mergeMap(({ id }) => this.clienteService.deleteCliente(id)
      .pipe(
        map(() => ClienteActions.deleteClienteSuccess({ id })),
        catchError(error => of(ClienteActions.deleteClienteFailure({ error })))
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private clienteService: ClienteService
  ) {}
}