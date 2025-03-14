import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'app/core/guards/auth.guard';
import { LoggedGuard } from 'app/core/guards/logged.guard';
import { LoginComponent } from 'app/modules/login/pages/login/login.component';
import { HomeComponent } from './modules/home/pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoggedGuard],
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./modules/login/login.module').then((m) => m.LoginModule),
        canActivate: [LoggedGuard],
      },
      {
        path: 'home',
        component: HomeComponent,
        loadChildren: () =>
          import('./modules/home/home.module').then((m) => m.HomeModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./modules/product/product.module').then(
            (m) => m.ProductModule
          ),
        canActivate: [AuthGuard],
      },

      {
        path: '**',
        redirectTo: '/products',
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  providers: [AuthGuard],
  exports: [RouterModule],
})
export class AppRoutingModule {}
