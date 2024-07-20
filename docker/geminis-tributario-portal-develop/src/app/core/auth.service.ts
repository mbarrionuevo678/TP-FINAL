import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this._isLoggedInSubject.asObservable();

  // Getter para obtener el valor actual de isLoggedIn
  get isLoggedIn(): boolean {
    return this._isLoggedInSubject.value;
  }

  // Setter para cambiar el valor de isLoggedIn
  set isLoggedIn(value: boolean) {
    this._isLoggedInSubject.next(value);
  }
}
