import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LawsuiteComponent } from './lawsuite.component';

const routes: Routes = [
  {
    path: ':id',
    component: LawsuiteComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LawsuiteRoutingModule {}
