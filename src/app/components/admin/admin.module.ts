import { ProductTableComponent } from './product-table/product-table.component';
import { ProductEditorComponent } from './product-editor/product-editor.component';
import { AuthenticationGuard } from './../../route-guards/authentication.guard';
import { AdminComponent } from './admin.component';
import { AuthComponent } from '../auth/auth.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModelModule } from 'src/app/model/model.module';
import { ServiceModule } from 'src/app/service/service.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from 'src/app/interceptors/jwt.interceptor';
import { ErrorInterceptor } from 'src/app/interceptors/error.interceptor';

// const routes: Routes = [
//     {path:'auth', component: AuthComponent },
//     {path:'main', component: AdminComponent,  canActivate: [AuthenticationGuard ]},
//     {path:'**', redirectTo: 'auth' },
// ];
const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'admin', redirectTo: 'main', canActivate: [AuthenticationGuard] },
  {
    path: 'main',
    component: AdminComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: 'products/:mode/:id', component: ProductEditorComponent },
      { path: 'products/:mode', component: ProductEditorComponent },
      { path: 'products', component: ProductTableComponent },

      { path: '**', redirectTo: 'products' },
    ],
  },
  { path: '**', redirectTo: 'auth' },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModelModule,
    ServiceModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    AuthComponent,
    AdminComponent,

    ProductTableComponent,
    ProductEditorComponent,
  ],
  providers: [
    AuthenticationGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
})
export class AdminModule {}
