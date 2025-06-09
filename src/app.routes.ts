import { Routes } from '@angular/router';
//import { AppLayout } from './app/layout/component/app.layout';
//import { Dashboard } from './app/pages/dashboard/dashboard';
//import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: Landing },
  { path: 'notfound', component: Notfound },
  { path: '**', redirectTo: 'notfound' }
];

