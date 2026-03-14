import { Routes, Route } from '@angular/router';
import { App } from './app';

const  defaultRoute: Route =  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'en/us'
  };

const regularRoute: Route = {
    path: ':language/:region',
    component: App
}
const fallbackRoute: Route = {
    path: '**',
    redirectTo: 'en/us',
    pathMatch: 'full'  
}

export const routes: Routes = [
    defaultRoute,
    regularRoute,
    fallbackRoute
];
