
import { ModelModule } from 'src/app/model/model.module';
import { NgModule} from '@angular/core';
import { ProductService } from './product.service';
import { CartService } from './cart.service';
import { OrderService } from './order.service';
import { RepositoryModule } from '../repository/repository.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@NgModule({
  imports: [ModelModule, RepositoryModule, HttpClientModule],
  providers: [
    CartService,
    ProductService,
    OrderService,
    AuthenticationService
  ],
})
export class ServiceModule { }

