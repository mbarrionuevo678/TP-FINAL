import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { MaterialModule } from '../core/modules/material.module';
import { RouterModule } from '@angular/router';
import { PipesModule } from './pipes/pipes.module';
import { DirectivesModule } from './directives/directives.module';
import { ExpirationDialogComponent } from './dialogs/expiration-dialog/expiration-dialog.component';
import { AlertComponent } from './dialogs/alert/alert.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, BreadcrumbsComponent, ExpirationDialogComponent, AlertComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    PipesModule,
    DirectivesModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    PipesModule,
    DirectivesModule,
  ],
})
export class SharedModule {}

