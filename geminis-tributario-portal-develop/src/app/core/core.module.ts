import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api.service';
import { NavigationService } from './navigation.service';
import { UtilsService } from './utils.service';
import { CartService } from './cart.service';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [ApiService, NavigationService, UtilsService, CartService, AuthService],
  exports: []
})
export class CoreModule { }
