
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreComponent } from './store.component';
import { CartSummaryComponent } from '../cart-summary/cart-summary.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { CartDetailsComponent } from '../cart-details/cart-details.component';
import { ModelModule } from 'src/app/model/model.module';
import { ServiceModule } from 'src/app/service/service.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from 'src/app/interceptors/jwt.interceptor';
import { ErrorInterceptor } from 'src/app/interceptors/error.interceptor';

@NgModule({
    imports: [
        BrowserModule,
        ModelModule,
        ServiceModule,
        FormsModule,
        RouterModule,
    ],
    declarations: [
        StoreComponent,
        CartSummaryComponent,
        CartDetailsComponent,
        CheckoutComponent
    ],
    exports: [
        StoreComponent,
        CartDetailsComponent,
        CheckoutComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ]
})
export class StoreModule { }
