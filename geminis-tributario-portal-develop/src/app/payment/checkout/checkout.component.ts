import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { CartService } from 'src/app/core/cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ObjectInfo } from 'src/app/shared/models/object-info.model';
import { NavigationService } from 'src/app/core/navigation.service';
import { Router } from '@angular/router';

export interface Cart {
  period: string;
  expiration: string;
  nominal: number;
  recharge: number;
  discount: number;
  penalty: number;
  total: number;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  paymentForm: FormGroup;
  paymentMethods: any[] = [];
  objectInfo = {} as ObjectInfo;

  constructor(
    private _api: ApiService, 
    private _cartService: CartService,
    private fb: FormBuilder,
    private _navigationService: NavigationService,
    private _router: Router
    ) {
    this.paymentForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.paymentMethods = [
      {
        name: 'credit-card.svg',
        selected: false
      },
      {
        name: 'payment_naranja.png',
        selected: true
      },
      {
        name: 'payment_cordobesa.png',
        selected: false
      },
      {
        name: 'payment_mercado_pago.png',
        selected: false
      },
      {
        name: 'payment_interbanking.png',
        selected: false
      }
    ]
  }

  // Debt Table Config
  cartDisplayedColumns: string[] = [
    'period',
    'expiration',
    'nominal',
    'recharge',
    'discount',
    'penalty',
    'total',
  ];
  cartDataSource = new MatTableDataSource<Cart>([]);

  ngOnInit(): void {
    
    this._navigationService.setTitle({ title: `Resumen del Pago` });
    //TODO: Hacer ForkJoin
    this.getCart();
    this.getObjectInfo();
  }

  getObjectInfo() {
    //TODO: integrar con id. 
    // Hay que traerlo como parametro o asignar al servicio cart
    // También puede ser un dataResolver
    this._api.getObjectInfo(123).subscribe((res) => {
      this.objectInfo = res as ObjectInfo;
    });
  }

  getCart() {
    this._cartService.getCart().subscribe((res: any) => {
      this.cartDataSource = new MatTableDataSource<Cart>(res);
    });
  }
  onSelectPaymentMethod(i: number){
    this.paymentMethods.forEach(item => item.selected = false);
    this.paymentMethods[i].selected = true;
  }
  onSubmit() {
    // Simular demora con Loader
    this._router.navigateByUrl('/payment/checkout-result')
  }
}
