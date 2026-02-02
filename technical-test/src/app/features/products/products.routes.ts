
import { Routes } from '@angular/router';
import { List } from './pages/list/list';
import { FormProduct } from './pages/form-product/form-product';

export const routes: Routes = [
    {
        path: '',
        component: List,
    },
    {
        path: 'add',
        component: FormProduct,
    },
    {
        path: 'edit:id',
        component: FormProduct,
    }
];
