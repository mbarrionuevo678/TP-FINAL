import { Component, Input, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { NavigationService } from 'src/app/core/navigation.service';
import { UtilsService } from 'src/app/core/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit{
  @Input() snav: any;
  title: string = '';

  constructor(
    public _navigationService: NavigationService,
    private router: Router,
    public _authService: AuthService,
    private _utilsService: UtilsService
  ){}

  ngOnInit(): void {
    /**
     * Obtiene el titulo de la página actual
     */
    this._navigationService.title$.subscribe((data: any) => {
      this.title = data['title']
    });
    /**
     * Resetea la variable cuando cambia de página
     */
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this._navigationService.clearTitle();
      }
    });
  }
  onAfipAuth(){
    this._authService.isLoggedIn = !this._authService.isLoggedIn;
    if(this._authService.isLoggedIn) {
      this._utilsService.showSuccess('Autenticación Exitosa')
    }
    console.log('*** this._authService.isLoggedIn; ', this._authService.isLoggedIn)
  }
}
