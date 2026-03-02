import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastrar-usuario',
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastrar-usuario.html',
  styleUrl: './cadastrar-usuario.css',
})
export class CadastrarUsuario {

  httpClient = inject(HttpClient);

  mensagemErro = signal<string>('');
  mensagemSucesso = signal<string>('');

  baseUrl = 'http://localhost:8081/api/v1/usuarios';

  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required]),
  });

  cadastrar(){
    if(this.formulario.invalid){
      return;
    }

    this.limparMensagens();

    const novoUsuario = this.formulario.getRawValue();

    this.httpClient.post(this.baseUrl+'/criar', novoUsuario,{responseType: 'text'})
    .subscribe({
      next: (res:any) => {
        this.mensagemSucesso.set('Usuário cadastrado com sucesso');
        this.formulario.reset();
      },
      error: (err:any) => {
        console.log(err);
        this.mensagemErro.set(err.error);
      }
    });
  }

  private limparMensagens(){
    this.mensagemErro.set('');
    this.mensagemSucesso.set('');
  }
}
