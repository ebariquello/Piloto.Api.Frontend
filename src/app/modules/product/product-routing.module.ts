import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListProductComponent } from './pages/list-product/list-product.component';
import { CreateEditProductComponent } from './pages/create-edit-product/create-edit-product.component';

const routes: Routes = [
  {
    path: '',
    component: ListProductComponent,
  },
  // {
  //   path: 'detail/:id',
  //   component: DetailDiscountParameterComponent,
  // },
  {
    path: 'new',
    component: CreateEditProductComponent,
  },
  {
    path: 'edit/:id',
    component: CreateEditProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
