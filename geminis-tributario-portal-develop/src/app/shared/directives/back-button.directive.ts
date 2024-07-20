import { Directive, HostListener } from '@angular/core';
import { NavigationService } from 'src/app/core/navigation.service';

@Directive({
  selector: '[semBackButton]',
})
export class BackButtonDirective {
  constructor(private _navigationService: NavigationService) {}

  @HostListener('click') onClick() {
    console.log('*** get click')
    this._navigationService.goBack();
  }
}
