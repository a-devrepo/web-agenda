import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Sidebar } from '../../layout/sidebar/sidebar';
import { Navbar } from '../../layout/navbar/navbar';
import { HttpClient } from '@angular/common/http';
import { ApiErrorResponse } from '../../interfaces/ApiErrorResponse';

@Component({
  selector: 'app-consultar-tarefa',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    Sidebar,
    Navbar
  ],
  templateUrl: './consultar-tarefa.html',
  styleUrl: './consultar-tarefa.css',
})
export class ConsultarTarefa {


  private httpClient = inject(HttpClient);

  tarefas = signal<any[]>([]);
  mensagemErro = signal<string>('');
  mensagemSucesso = signal<string>('');
  errors = signal<ApiErrorResponse | null>(null);

  apiBaseUrl = 'http://localhost:8082/api/v1/tarefas'


  ngOnInit(): void {

    this.httpClient.get(this.apiBaseUrl)
    .subscribe({
      next:(data) => {
        console.log(data);
        this.tarefas.set(data as any[]);
      },
      error: (err) => {
        console.log(err.error)
        this.errors.set(err.error as ApiErrorResponse);
      }
    })
  }

  onDelete(tarefa: any) {

    this.limparMensagens();

    if(confirm('Deseja realmente excluir a tarefa: ' + tarefa.nome + '?')) {
      //Enviando uma requisição do tipo DELETE para a API
      this.httpClient.delete(this.apiBaseUrl+ '/' + tarefa.id)
        .subscribe({
          next: (data: any) => {
            this.mensagemSucesso.set('Tarefa: ' + data.nome + ", excluída com sucesso!");
            this.ngOnInit();
          },
          error: (e) => {
            this.errors.set(e.error);
          }
        });
    }
  }

  private limparMensagens() {
    this.mensagemSucesso = signal<string>('');
    this.errors.set(null);
    this.mensagemErro();
  }

}
