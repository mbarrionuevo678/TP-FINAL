import { Component } from '@angular/core';
import { NavigationService } from 'src/app/core/navigation.service';

@Component({
  selector: 'app-checkout-result',
  templateUrl: './checkout-result.component.html',
  styleUrls: ['./checkout-result.component.scss']
})
export class CheckoutResultComponent {
  constructor(
    private _navigationService: NavigationService
  ){
    this._navigationService.setTitle({ title: 'Pago Completado' })
  }

}
