import { Routes } from '@angular/router';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { DoctorComponent } from './app/pages/crud/doctor/doctor.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: Landing },
  { path: 'notfound', component: Notfound },
  { path: 'doktor', component: DoctorComponent }, 
  { path: '**', redirectTo: 'notfound' },
];
