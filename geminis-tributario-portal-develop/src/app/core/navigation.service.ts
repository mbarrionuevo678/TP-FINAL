import { Injectable } from '@angular/core';
import { Subject, Observable, map, throwError, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Action } from '../shared/models/action.model';
import { AuthService } from './auth.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(
    private _location: Location,
    private _http: HttpClient,
    private _authService: AuthService,
    private _utilsService: UtilsService
  ) {}
  title = new Subject();
  public title$ = this.title.asObservable();

  setTitle(data: any) {
    this.title.next(data);
  }
  clearTitle() {
    this.title.next({});
  }
  goBack() {
    this._location.back();
  }

  /**
   * Menu de Navegación
   * Toma la definición de la clase Action donde se define el modelo
   * la respuesta se mapea para agregar las propiedades calculadas
   * @returns Actions
   */

  // Implementación anterior con Tipos
  // Esta implementación es si viniera en el servicio directamente
  //
  // getActions(): Observable<Actions[]> {
  //   return this._http
  //     .get<Actions[]>('assets/mocks/actions.json')
  //     .pipe(map((actions) => actions.map((action) => new Actions(action, this._authService))));
  // }

  getActions(): Observable<Action[]> {
    return this._http
      .get<any>('assets/mocks/actions.json')
      .pipe(
        catchError((error) => this.handleError(error)),
        switchMap((result) => {
          if(result.status.success === false){
            return this.handleDataError(result.data)
          } else {
            return of(result);
          }
        }),
        map((result) =>
          result.data.map(
            (action: Action) => new Action(action, this._authService)
          )
        )
      )
  }
  private handleError(error: any): Observable<never> {
    //TODO: Mover implementación a interceptor
    console.error('Error en la petición:', error);
    return throwError(() => new Error('Hay un error en el servidor'))
  }
  private handleDataError(status: any): Observable<never> {
    const message = `${status.rspDescripcion} - Cod: ${status.rspId}`
    this._utilsService.showError(message)
    return throwError(() => new Error(message))
  }

}
