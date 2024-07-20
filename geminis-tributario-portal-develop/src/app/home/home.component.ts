import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../core/utils.service';
import { SwiperOptions } from 'swiper/types';
import { A11y, Mousewheel, Navigation, Pagination } from 'swiper/modules';
import { ApiService } from '../core/api.service';
import { NavigationService } from '../core/navigation.service';
import { Action } from '../shared/models/action.model';
import { forkJoin, map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ExpirationDialogComponent } from '../shared/dialogs/expiration-dialog/expiration-dialog.component';
import { Expiration } from '../shared/models/expiration.model';
import { AuthService } from '../core/auth.service';

export interface CarouselImage {
  id: string;
  filename: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isMobile: boolean;
  panelOpenState: boolean = false;
  actions: any = [];
  featuredButtons: any[] = [];
  buttons: any[] = [];
  expirations: Expiration[] = [];
  carouselImages: CarouselImage[] = [];

  // Swiper initialization
  initSwiper: boolean = false;

  // Swiper Shared config
  swiperConfig = {
    modules: [Navigation, Pagination, A11y, Mousewheel],
    autoHeight: true,
    spaceBetween: 20,
    navigation: true,
    centeredSlides: true,
    autoplay: {
      delay: 2000,
    },
  };

  public imageSwiperConfig: SwiperOptions = {
    ...this.swiperConfig,
    slidesPerView: 'auto',
  };

  public expirationSwiperConfig: SwiperOptions = {
    ...this.swiperConfig,
    breakpoints: {
      1000: {
        slidesPerView: 4,
      },
      600: {
        slidesPerView: 3,
      },
    },
  };

  constructor(
    private _utilsService: UtilsService,
    private _api: ApiService,
    private _navigationService: NavigationService,
    public dialog: MatDialog,
    private _authService: AuthService
  ) {
    this.isMobile = this._utilsService.isMobile;

    // Se actualiza el menú al estar logueado
    this._authService.isLoggedIn$.subscribe(() => this.onLoadMenu())
  }
  ngOnInit() {
    this.onLoadMenu();
    this.onInitView();
  }
  onInitView() {
    forkJoin([
      this._api.getHomeCarouselImages(),
      this._api.getExpirations(),
    ]).subscribe(([carouselImages, expirations]: any) => {
      this.carouselImages = carouselImages;
      this.expirations = expirations;
      // Init sliders
      this.initSwiper = true;
    });
  }
  onLoadMenu() {
    this._navigationService.getActions().subscribe((res) => {
      this.actions = res;

      // Clonar el array original
      //let clonedActions = JSON.parse(JSON.stringify(this.actions));
      let clonedActions = [...this.actions];

      // Obtención de Botones Destacados
      this.featuredButtons = clonedActions.flatMap((action: Action) =>
        action.data.filter((item: any) => item.featured)
      );

      // Remover los botones destacados del array original y obtener un array plano de elementos en data
      this.buttons = clonedActions.flatMap((action: Action) =>
        action.data.filter((item: any) => !item.featured)
      );
    });
  }

  openCalendarDialog() {
    const dialogRef = this.dialog.open(ExpirationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
