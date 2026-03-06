import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-autenticar-usuario',
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './autenticar-usuario.html',
  styleUrl: './autenticar-usuario.css',
})
export class AutenticarUsuario {

  private httpClient = inject(HttpClient);
  private router = inject(Router);

  mensagemErro = signal<string>('');

  baseUrl = 'http://localhost:8081/api/v1/usuarios';

  formulario = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required]),
  });


  autenticar(){
    if(this.formulario.invalid){
      return;
    }

    this.limparMensagens();

    const usuario = this.formulario.getRawValue();

    this.httpClient.post(this.baseUrl+'/autenticar', usuario,{responseType: 'text'})
    .subscribe({
      next: (res:any) => {
        const objetoJson =JSON.parse(res);
        sessionStorage.setItem('usuario', JSON.stringify(objetoJson));
        this.router.navigate(['pages/dashboard']);

      },
      error: (err:any) => {

        this.mensagemErro.set(err.error);
      }
    });
  }

  private limparMensagens(){
    this.mensagemErro.set('');
  }
}
