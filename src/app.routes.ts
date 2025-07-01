import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/appLayout/app.layout';
import { AuthGuard } from './app/layout/service/auth.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./app/pages/crud/login/login.component').then((m) => m.LoginComponent) },

  {
    path: '',
    component: AppLayout,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'doktor', pathMatch: 'full' },
      { path: 'doktor', loadComponent: () => import('./app/pages/crud/doctor/doctor.component').then((m) => m.DoctorComponent), canActivate: [AuthGuard] },
      { path: 'ambulante', loadComponent: () => import('./app/pages/crud/infirmaries/infirmaries.component').then((m) => m.InfirmariesAPI), canActivate: [AuthGuard] },
      { path: 'pacients', loadComponent: () => import('./app/pages/crud/pacients/pacients.component').then((m) => m.PacientsAPI), canActivate: [AuthGuard] }
    ]
  }
];


