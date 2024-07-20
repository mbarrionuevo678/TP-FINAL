import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../core/modules/material.module';
import { SharedModule } from '../shared/shared.module';
import { LawsuiteComponent } from './lawsuite.component';
import { LawsuiteRoutingModule } from './lawsuite-routing.module';


@NgModule({
  declarations: [LawsuiteComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    LawsuiteRoutingModule
  ]
})
export class LawsuiteModule { }
