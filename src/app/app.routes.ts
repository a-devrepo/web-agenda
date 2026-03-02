import { Routes } from '@angular/router';
import { AutenticarUsuario } from './pages/autenticar-usuario/autenticar-usuario';
import { CadastrarUsuario } from './pages/cadastrar-usuario/cadastrar-usuario';

export const routes: Routes = [
  {
    path: 'pages/autenticar-usuario',
    component: AutenticarUsuario,
  },
  {
    path: 'pages/cadastrar-usuario',
    component: CadastrarUsuario,
  },
  {
    path: '',
    redirectTo: 'pages/autenticar-usuario', pathMatch: 'full',
  } 
];
