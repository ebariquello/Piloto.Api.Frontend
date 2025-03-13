import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { IMaskModule } from 'angular-imask';
// import { DetailDiscountParameterService } from 'app/core/services/detail-discount-parameter/detail-discount-parameter.service';
import { ProductRoutingModule } from './product-routing.module';
import { GridModule } from 'app/shared/components/grid/grid.module';
import { ListProductComponent } from './pages/list-product/list-product.component';
// import { DetailDiscountParameterComponent } from './pages/detail-product/detail-discount-parameter.component';
import { TableModule } from 'app/shared/components/table/table.module';
import { CreateEditProductComponent } from './pages/create-edit-product/create-edit-product.component';
import { FormCreateEditProductComponent } from './components/form-create-edit-product/form-create-edit-product.component';
import { ToggleEmployeeModule } from 'app/shared/components/toggle-employee/toggle-employee.module';
import { CommentFormModule } from 'app/shared/components/comment-form/comment-form.module';
import { ProductService } from 'app/core/services/product/product.service';
import { ModalConfirmModule } from 'app/shared/components/modal-confirm/modal-confirm.module';

@NgModule({
  declarations: [
    ListProductComponent,
    // DetailDiscountParameterComponent,
    FormCreateEditProductComponent,
    CreateEditProductComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    RouterModule,
    GridModule,
    ModalConfirmModule,
    TableModule,
    ReactiveFormsModule,
    IMaskModule,
    ToggleEmployeeModule,
    CommentFormModule,
  ],
  providers: [
    ToastrService,
    ProductService,
    // DetailDiscountParameterService
  ],
})
export class ProductModule {}
