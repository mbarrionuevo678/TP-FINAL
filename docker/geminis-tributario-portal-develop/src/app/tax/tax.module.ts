import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxRoutingModule } from './tax-routing.module';
import { TaxSearchComponent } from './tax-search/tax-search.component';
import { MaterialModule } from '../core/modules/material.module';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { TaxDetailComponent } from './tax-detail/tax-detail.component';
import { SharedModule } from '../shared/shared.module';
import { TaxItemComponent } from './tax-item/tax-item.component';
import { PlanDetailComponent } from './plan-detail/plan-detail.component';



@NgModule({
  declarations: [TaxSearchComponent, TaxDetailComponent, TaxItemComponent, PlanDetailComponent],
  imports: [
    CommonModule,
    TaxRoutingModule,
    MaterialModule,
    RecaptchaV3Module,
    SharedModule,
  ],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptcha.siteKey,
    },
  ],
})
export class TaxModule {}
