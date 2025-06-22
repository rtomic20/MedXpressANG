import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/appLayout/app.layout';

export const routes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', redirectTo: 'doktor', pathMatch: 'full' },
            {
                path: 'doktor',
                loadComponent: () => import('./app/pages/crud/doctor/doctor.component').then((m) => m.DoctorComponent)
            },
            {
                path: 'ambulante',
                loadComponent: () => import('./app/pages/crud/infirmaries/infirmaries.component').then((m) => m.InfirmariesAPI)
            },
            {
                path: 'pacients',
                loadComponent: () => import('./app/pages/crud/pacients/pacients.component').then((m) => m.PacientsAPI)
            }
        ]
    }
];
