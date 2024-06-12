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
  {
    path: 'task-2',
    loadComponent: () => import('./task-2/task-2.page').then( m => m.Task2Page)
  },
  {
    path: 'task-4',
    loadComponent: () => import('./task-4/task-4.page').then( m => m.Task4Page)
  },
];
