import { Component, inject, OnInit, signal } from '@angular/core';
import { Navbar } from '../../layout/navbar/navbar';
import { Sidebar } from '../../layout/sidebar/sidebar';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ApiErrorResponse } from '../../interfaces/ApiErrorResponse';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-consultar-categoria',
  imports: [
    Navbar,
    Sidebar,
    CommonModule,
    RouterLink
  ],
  templateUrl: './consultar-categoria.html',
  styleUrl: './consultar-categoria.css',
})
export class ConsultarCategoria implements OnInit {

  httpClient = inject(HttpClient);

  apiBaseUrl = 'http://localhost:8082/api/v1/categorias';


  categorias = signal<any[]>([]);
  mensagemErro = signal<string>('');
  mensagemSucesso = signal<string>('');
  errors = signal<ApiErrorResponse | null>(null);

  ngOnInit(): void {

    this.httpClient.get(this.apiBaseUrl)
    .subscribe({
      next:(data) => {
        console.log(data);
        this.categorias.set(data as any[]);
      },
      error: (err) => {
        console.log(err.error)
        this.errors.set(err.error as ApiErrorResponse);
      }
    })
  }

  onDelete(categoria: any) {

    this.limparMensagens();

    if(confirm('Deseja realmente excluir a categoria: ' + categoria.nome + '?')) {
      //Enviando uma requisição do tipo DELETE para a API
      this.httpClient.delete(this.apiBaseUrl + categoria.id)
        .subscribe({
          next: (data: any) => {
            alert('Categoria: ' + data.nome + ", excluída com sucesso!");
            this.ngOnInit();
          },
          error: (e) => {
            this.errors.set(e.error as ApiErrorResponse);
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
