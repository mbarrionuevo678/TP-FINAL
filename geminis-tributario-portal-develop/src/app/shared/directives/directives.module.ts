import { NgModule } from '@angular/core';
import { SwiperDirective } from './swiper.directive';
import { BackButtonDirective } from './back-button.directive';


@NgModule({
  declarations: [SwiperDirective, BackButtonDirective],
  imports: [],
  exports: [SwiperDirective, BackButtonDirective],
})
export class DirectivesModule {}
