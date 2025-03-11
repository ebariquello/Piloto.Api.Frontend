
import { StoreFirstGuard } from './route-guards/storefirst.guard';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { StoreModule } from './components/store/store.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './components/store/store.component';

const routes: Routes = [
  {
    path: 'store',
    component: StoreComponent,
    canActivate: [StoreFirstGuard]
  },
  {
    path: 'cart',
    component: CartDetailsComponent,
    canActivate: [StoreFirstGuard]
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [StoreFirstGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule),
    canActivate: [StoreFirstGuard]
  },
  {
    path: '**',
    redirectTo: '/store',
  },
];

@NgModule({
  imports: [BrowserModule, StoreModule, RouterModule.forRoot(routes)],
  providers: [StoreFirstGuard],
  exports: [RouterModule],
})
export class AppRoutingModule {}
