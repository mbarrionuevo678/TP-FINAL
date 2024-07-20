import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxSearchComponent } from './tax-search/tax-search.component';
import { TaxDetailComponent } from './tax-detail/tax-detail.component';
import { TaxItemComponent } from './tax-item/tax-item.component';
import { PlanDetailComponent } from './plan-detail/plan-detail.component';

const routes: Routes = [
  {
    path: '',
    component: TaxSearchComponent,
  },
  {
    path: 'search/:objectType',
    title: 'Buscar Impuesto',
    component: TaxSearchComponent,
  },
  {
    path: 'tax-detail',
    title: 'Detalle del impuesto',
    component: TaxDetailComponent,
  },
  {
    path: 'tax-item/:objectType/:id',
    title: 'Detalle del impuesto',
    component: TaxItemComponent,
  },
  {
    path: 'plan-detail/:id',
    title: 'Detalle del Plan',
    component: PlanDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaxRoutingModule {}
