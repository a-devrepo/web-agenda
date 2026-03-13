import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  nomeUsuario = signal<string>('');
  perfilUsuario = signal<string>('');

  ngOnInit(){
    this.atribuirDadosUsuarioLogado();
  }

  private obterJson(){
    return sessionStorage.getItem('usuario');
  }

  private obterUsuario(){
    return JSON.parse(this.obterJson() as string);
  }

  private atribuirDadosUsuarioLogado(){

    const usuario = this.obterUsuario();

    console.log(typeof usuario);

    this.nomeUsuario.set(usuario.nome);
    this.perfilUsuario.set(usuario.perfil);

  }

  logout() {
    if(confirm('Deseja realmente sair do sistema?')) {
      sessionStorage.removeItem('usuario');
      location.href = '/';
    }
  }
}
