import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Navbar } from '../../layout/navbar/navbar';
import { Sidebar } from '../../layout/sidebar/sidebar';
import { ApiErrorResponse } from '../../interfaces/ApiErrorResponse';

@Component({
  selector: 'app-cadastrar-categoria',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, Navbar, Sidebar],
  templateUrl: './cadastrar-categoria.html',
  styleUrl: './cadastrar-categoria.css',
})
export class CadastrarCategoria {

  mensagemErro = signal<string>('');
  mensagemSucesso = signal<string>('');
  errors = signal<ApiErrorResponse | null>(null);

  baseUrl = 'http://localhost:8082/api/v1/categorias';

  private httpClient = inject(HttpClient);

  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required]),
  });

  cadastrar() {
    if (this.formulario.invalid) {
      return;
    }

    this.limparMensagens();

    const novaCategoria = this.formulario.getRawValue();

    this.httpClient
      .post(this.baseUrl, novaCategoria)
      .subscribe({
        next: (res: any) => {
          this.mensagemSucesso.set('Categoria cadastrada com sucesso');
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
