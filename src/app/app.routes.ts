import { Routes } from '@angular/router';
import { AutenticarUsuario } from './pages/autenticar-usuario/autenticar-usuario';
import { CadastrarUsuario } from './pages/cadastrar-usuario/cadastrar-usuario';
import { Dashboard } from './pages/dashboard/dashboard';
import { AuthGuard } from './guards/AuthGuard';
import { CadastrarCategoria } from './pages/cadastrar-categoria/cadastrar-categoria';
import { ConsultarCategoria } from './pages/consultar-categoria/consultar-categoria';
import { EditarCategoria } from './pages/editar-categoria/editar-categoria';
import { CadastrarTarefa } from './pages/cadastrar-tarefa/cadastrar-tarefa';
import { ConsultarTarefa } from './pages/consultar-tarefa/consultar-tarefa';
import { EditarTarefa } from './pages/editar-tarefa/editar-tarefa';

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
    path: 'pages/dashboard', canActivate:[AuthGuard],
    component: Dashboard,
  },
  {
    path: 'pages/cadastrar-categoria', canActivate:[AuthGuard],
    component: CadastrarCategoria,
  },
  {
    path: 'pages/consultar-categoria', canActivate:[AuthGuard],
    component: ConsultarCategoria,
  },
  {
    path: 'pages/editar-categoria/:id', canActivate:[AuthGuard],
    component: EditarCategoria,
  },
  {
    path: 'pages/cadastrar-tarefa', canActivate:[AuthGuard],
    component: CadastrarTarefa,
  },
  {
    path: 'pages/consultar-tarefa', canActivate:[AuthGuard],
    component: ConsultarTarefa,
  },
  {
    path: 'pages/editar-tarefa', canActivate:[AuthGuard],
    component: EditarTarefa,
  },
  {
    path: '',
    redirectTo: 'pages/autenticar-usuario', pathMatch: 'full',
  }
];
