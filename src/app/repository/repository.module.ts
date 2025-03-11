import { ModelModule } from './../model/model.module';
// import { RestUserRepository } from './rest.user.repository';
import { RestOrderRepository } from './rest.order.repository';
// import { StaticProductRepository } from './static.product.repository';
// import { StaticOrderRepository } from './static.order.repository';

import { NgModule } from '@angular/core';
import { RestProductRepository } from './rest.product.repository';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [ModelModule, HttpClientModule],
  providers: [
    RestOrderRepository,
    // RestUserRepository,
    RestProductRepository,
    // StaticOrderRepository,
    // StaticProductRepository,
    // { provide: StaticOrderRepository, useClass: RestOrderRepository },
    // { provide: StaticProductRepository, useClass: RestProductRepository },
  ],
})
// export class RepositoryModule {}
export class RepositoryModule {}
