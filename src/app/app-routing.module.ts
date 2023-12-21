import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'registrocli',
    loadChildren: () => import('./pages/registrocli/registrocli.module').then( m => m.RegistrocliPageModule)
  },
  {
    path: 'registroempresa',
    loadChildren: () => import('./pages/registroempresa/registroempresa.module').then( m => m.RegistroempresaPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'listauser',
    loadChildren: () => import('./pages/listauser/listauser.module').then( m => m.ListauserPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '**',
    redirectTo: 'inicio'
  },   {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'listauser',
    loadChildren: () => import('./pages/listauser/listauser.module').then( m => m.ListauserPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registrocli',
    loadChildren: () => import('./pages/registrocli/registrocli.module').then( m => m.RegistrocliPageModule)
  },
  {
    path: 'registroempresa',
    loadChildren: () => import('./pages/registroempresa/registroempresa.module').then( m => m.RegistroempresaPageModule)
  },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
