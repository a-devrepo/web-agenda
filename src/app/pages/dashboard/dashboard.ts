import { CommonModule } from '@angular/common';
import { Component, OnInit, signal} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

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
