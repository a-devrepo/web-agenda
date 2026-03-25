import { Component, inject, OnInit, signal } from '@angular/core';
import { Navbar } from '../../layout/navbar/navbar';
import { Sidebar } from '../../layout/sidebar/sidebar';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiErrorResponse } from '../../interfaces/ApiErrorResponse';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastrar-tarefa',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Navbar,
    Sidebar,
  ],
  templateUrl: './cadastrar-tarefa.html',
  styleUrl: './cadastrar-tarefa.css',
})
export class CadastrarTarefa implements OnInit{

httpClient = inject(HttpClient);

mensagemSucesso = signal<string>('');
mensagemErro = signal<string>('');
errors = signal<ApiErrorResponse | null>(null);
categorias = signal<any[]>([]);

apiBaseUrl = 'http://localhost:8082/api/v1/'


ngOnInit(): void {

  this.httpClient.get(this.apiBaseUrl + 'categorias')
  .subscribe({
    next:(data) => {
      this.categorias.set(data as any[]);
    },
    error: (err) => {
      this.errors.set(err.error as ApiErrorResponse);
    }
  })
}

formulario = new FormGroup({
  nome : new FormControl('', [Validators.required]),
  data : new FormControl('', [Validators.required]),
  hora : new FormControl('', [Validators.required]),
  prioridade : new FormControl('', [Validators.required]),
  categoriaId : new FormControl('', [Validators.required])
});


cadastrar() {
  if (this.formulario.invalid) {
    return;
  }

  this.limparMensagens();

  const novaTarefa = this.formulario.getRawValue();

  this.httpClient
    .post(this.apiBaseUrl+ 'tarefas', novaTarefa)
    .subscribe({
      next: (res: any) => {
        this.mensagemSucesso.set('Tarefa cadastrada com sucesso');
        this.formulario.reset();
      },
      error: (err) => {
        //console.log(err);
        //this.mensagemErro.set(err.error);
        this.errors.set(err.error as ApiErrorResponse)
      },
    });
}

private limparMensagens() {
  this.mensagemErro.set('');
  this.mensagemSucesso.set('');
  this.errors.set(null);
}
}