import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, map } from 'rxjs';

export interface ObjectInfo {
  id: number;
  cuit: number;
  fullName: string;
  holder: string;
  settlementType: number;
  address: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _http: HttpClient) {}

  /**
   * Home
   */

  getHomeCarouselImages() {
    return this._http.get('assets/mocks/carousel.json');
  }

  /**
   * Taxes
   */

  getObjectInfo(id:number) {
    return this._http.get('assets/mocks/objectInfo.json');
  }
  // getObjectInfo(id: string): Observable<ObjectInfo> {
  //   return this._http.get<ObjectInfo>(
  //     environment.apiUrl + `api/object/${id}`
  //   );
  // }
  getDebts() {
    return this._http.get('assets/mocks/debts.json');
  }
  getPayments() {
    return this._http.get('assets/mocks/payments.json');
  }
  getPlans() {
    return this._http.get('assets/mocks/plans.json');
  }
  getPenalties() {
    return this._http.get('assets/mocks/penalties.json');
  }
  getLawsuits() {
    return this._http.get('assets/mocks/lawsuits.json');
  }
  getExpirations() {
    return this._http.get('assets/mocks/tax_expirations.json');
  }

  /**
   *  Plan
   */

  //TODO: Handle Error + Type
  getPlanInfo(id:number): Observable<any> {
    return this._http
      .get<any>('assets/mocks/plan_info.json')
      .pipe(map((res) => res.data));
  }
  getPlanInstallments(id:number): Observable<any> {
    return this._http
      .get<any>('assets/mocks/plan_installments.json')
      .pipe(map((res) => res.data));
  }
  getPlanPeriods(id:number): Observable<any> {
    return this._http
      .get<any>('assets/mocks/plan_periods.json')
      .pipe(map((res) => res.data.periods));
  }
}
