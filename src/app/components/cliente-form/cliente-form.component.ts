// src/app/components/cliente-form/cliente-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Cliente } from '../../models/cliente.model';
import * as ClienteActions from '../../store/cliente/cliente.actions';
import * as ClienteSelectors from '../../store/cliente/cliente.selectors';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent implements OnInit {
  clienteForm: FormGroup;
  isEditing = false;
  clienteId: number | null = null;
  cliente$: Observable<Cliente | null>;
  loading$: Observable<boolean>;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private messageService: MessageService
  ) {
    this.cliente$ = this.store.select(ClienteSelectors.selectCliente);
    this.loading$ = this.store.select(ClienteSelectors.selectClienteLoading);
    
    this.clienteForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      apellido: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
      telefono: ['', [Validators.required, Validators.maxLength(20)]],
      direccion: ['', [Validators.required, Validators.maxLength(200)]],
      activo: [true]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditing = true;
        this.clienteId = +params['id'];
        this.store.dispatch(ClienteActions.loadCliente({ id: this.clienteId }));
        
        this.cliente$.subscribe(cliente => {
          if (cliente) {
            this.clienteForm.patchValue({
              nombre: cliente.nombre,
              apellido: cliente.apellido,
              email: cliente.email,
              telefono: cliente.telefono,
              direccion: cliente.direccion,
              activo: cliente.activo
            });
          }
        });
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;
    
    if (this.clienteForm.invalid) {
      return;
    }
    
    if (this.isEditing && this.clienteId) {
      this.store.dispatch(ClienteActions.updateCliente({ 
        id: this.clienteId, 
        cliente: this.clienteForm.value 
      }));
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Cliente actualizado correctamente'
      });
    } else {
      this.store.dispatch(ClienteActions.createCliente({ 
        cliente: this.clienteForm.value 
      }));
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Cliente creado correctamente'
      });
    }
    
    setTimeout(() => {
      this.router.navigate(['/clientes']);
    }, 1000);
  }

  cancel(): void {
    this.router.navigate(['/clientes']);
  }

  // Solución al problema de TypeScript con la notación de índice
  get f(): { [key: string]: AbstractControl } {
    return this.clienteForm.controls as { [key: string]: AbstractControl };
  }
}