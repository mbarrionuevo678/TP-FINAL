import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutResultComponent } from './checkout-result/checkout-result.component';
import { PaymentRoutingModule } from './payment-routing.module';
import { MaterialModule } from '../core/modules/material.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    CheckoutComponent,
    CheckoutResultComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class PaymentModule { }
