
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./products').then(m => m.Products),
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/list/list').then(m => m.List)
            },
            {
                path: 'add',
                loadComponent: () => import('./pages/form-product/form-product').then(m => m.FormProduct)
            },
            {
                path: 'edit/:id',
                loadComponent: () => import('./pages/form-product/form-product').then(m => m.FormProduct)
            }
        ]
    }
];
