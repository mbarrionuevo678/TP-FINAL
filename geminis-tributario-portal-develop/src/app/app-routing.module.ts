import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CurrentSiteComponent } from './current-site/current-site.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    title: 'Inicio',
    component: HomeComponent,
  },
  {
    path: 'current-site',
    component: CurrentSiteComponent,
  },
  {
    path: 'tax',
    loadChildren: () => import('./tax/tax.module').then((m) => m.TaxModule),
  },
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then((m) => m.PaymentModule),
  },
  {
    path: 'lawsuite',
    loadChildren: () => import('./lawsuite/lawsuite.module').then((m) => m.LawsuiteModule),
  },
  // {
  //   path: '**',
  //   component: PageNotFoundComponent, // Wildcard route for a 404 page
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
