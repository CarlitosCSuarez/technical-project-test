import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'products',
        loadChildren: () => import('./features/products/products.routes').then(f => f.routes)
    },
    { path: '', redirectTo: 'products', pathMatch: 'full', },
    { path: '**', redirectTo: 'products', pathMatch: 'full', },
];
