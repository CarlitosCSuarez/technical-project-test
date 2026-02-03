
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./products').then(m => m.Products),
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/product-list/product-list').then(m => m.ProductList)
            },
            {
                path: 'add',
                loadComponent: () => import('./pages/product-form/product-form').then(m => m.FormProduct)
            },
            {
                path: 'edit/:id',
                loadComponent: () => import('./pages/product-form/product-form').then(m => m.FormProduct)
            }
        ]
    }
];
