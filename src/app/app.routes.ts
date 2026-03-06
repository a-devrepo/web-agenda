import { Routes } from '@angular/router';
import { AutenticarUsuario } from './pages/autenticar-usuario/autenticar-usuario';
import { CadastrarUsuario } from './pages/cadastrar-usuario/cadastrar-usuario';
import { Dashboard } from './pages/dashboard/dashboard';

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
    path: 'pages/dashboard',
    component: Dashboard,
  },
  {
    path: '',
    redirectTo: 'pages/autenticar-usuario', pathMatch: 'full',
  }
];
