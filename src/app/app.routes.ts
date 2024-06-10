import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'start-hunt',
    loadComponent: () => import('./start-hunt/start-hunt.page').then( m => m.StartHuntPage)
  },
  {
    path: 'task-1',
    loadComponent: () => import('./task-1/task-1.page').then( m => m.Task1Page)
  },
];
