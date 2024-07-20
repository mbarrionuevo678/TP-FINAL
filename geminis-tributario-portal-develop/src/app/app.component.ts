import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { environment } from 'src/environments/environment';
import { UtilsService } from 'src/app/core/utils.service';
import { NavigationService } from './core/navigation.service';
import { Action } from './shared/models/action.model';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy, OnInit {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  fillerNav = Array.from({ length: 10 }, (_, i) => `Nav Item ${i + 1}`);
  menu: Action[] = [];

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public _utilsService: UtilsService,
    private _navigationService: NavigationService,
    private _authService: AuthService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => {
      changeDetectorRef.detectChanges();
      //environment.isMobile = this.mobileQuery.matches;
    };
    this.mobileQuery.addListener(this._mobileQueryListener);
    //environment.isMobile = this.mobileQuery.matches;

    _utilsService.setIsMobile();
    console.log('*** Set environment', _utilsService.isMobile);

    // Se actualiza el menú al estar logueado
    this._authService.isLoggedIn$.subscribe((res) => {
      this.onInitializeActions();
    })
  }
  ngOnInit(): void {
    this.onInitializeActions();
  }

  onInitializeActions() {
    this._navigationService.getActions().subscribe((res: Action[]) => {
      this.menu = res;
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
