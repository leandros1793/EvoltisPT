// src/app/components/cliente-list/cliente-list.component.ts

import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Cliente } from '../../models/cliente.model';
import * as ClienteActions from '../../store/cliente/cliente.actions';
import * as ClienteSelectors from '../../store/cliente/cliente.selectors';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.scss']
})
export class ClienteListComponent implements OnInit {
  @ViewChild('dt') table!: Table;
  
  clientes$: Observable<Cliente[]>;
  loading$: Observable<boolean>;
  
  filters: any = {};

  constructor(
    private store: Store,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.clientes$ = this.store.select(ClienteSelectors.selectAllClientes);
    this.loading$ = this.store.select(ClienteSelectors.selectClienteLoading);
  }

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    this.store.dispatch(ClienteActions.loadClientes());
  }

  editCliente(id: number): void {
    this.router.navigate(['/clientes/edit', id]);
  }

  deleteCliente(cliente: Cliente): void {
    this.confirmationService.confirm({
      message: `¿Estás seguro que deseas eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(ClienteActions.deleteCliente({ id: cliente.id }));
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Cliente eliminado correctamente'
        });
      }
    });
  }

  createCliente(): void {
    this.router.navigate(['/clientes/create']);
  }
  
  // Método para manejar el filtro global correctamente con TypeScript
  onGlobalFilter(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.table.filterGlobal(inputElement.value, 'contains');
  }
}