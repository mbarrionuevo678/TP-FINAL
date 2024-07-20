import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { NavigationService } from 'src/app/core/navigation.service';
import { ObjectInfo } from 'src/app/shared/models/object-info.model';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { PlanInstallment } from 'src/app/shared/models/plan-installment.model';
import { PlanPeriod } from 'src/app/shared/models/plan-period.model';
import { PlanInfo } from 'src/app/shared/models/plan-info.model';

@Component({
  selector: 'app-plan-detail',
  templateUrl: './plan-detail.component.html',
  styleUrls: ['./plan-detail.component.scss'],
})
export class PlanDetailComponent implements OnInit {
  objectInfo = {} as ObjectInfo;
  planInfo = {} as PlanInfo;
  objectType: string | null = '';
  id!: number;

  // Installments Table Config
  planInstallmentsDisplayedColumns: string[] = [
    'select',
    'installment',
    'nominal',
    'paid',
    'recharge',
    'total',
    'expiration',
    'status'
  ];  
  
  planInstallmentsDataSource = new MatTableDataSource<PlanInstallment>([]);
  planInstallmentsSelection = new SelectionModel<PlanInstallment>(true, []);

  // Periods Table Config
  planPeriodsDisplayedColumns: string[] = [
    'period',
    'expiration',
    'nominal',
    'recharge',
    'penalty',
    'total',
    'reference'
  ];
  planPeriodsDataSource = new MatTableDataSource<PlanPeriod>([]);

  constructor(
    private _api: ApiService,
    private _navigationService: NavigationService,
    private _route: ActivatedRoute
  ) {
    this._route.params.subscribe((res) => {
      //this.objectType = res['objectType'];
      this.id = res['id'] || 0;
      this._navigationService.setTitle({ title: `Plan de Pagos` });
    });
  }

  /**
   * - Ingresar a esta vista solo con el ID de Plan
   * - Obtener a través de este ID:
   *  - Información del Objeto
   *  - Datos de la deuda
   *  - Datos de periodos
   *  - Datos de cuotas
   */

  ngOnInit(): void {
    this.getPlanInfo();
    this.getObjectInfo();
    this.getPlanInstallments();
    this.getPlanPeriods();
  }
  getObjectInfo() {
    this._api.getObjectInfo(this.id).subscribe((res) => {
      this.objectInfo = res as ObjectInfo;
    });
  }
  getPlanInfo() {
    this._api.getPlanInfo(this.id).subscribe((res) => {
      this.planInfo = res as PlanInfo;
    });
  }

  /**
   * Installments Table
   */

  getPlanInstallments() {
    this._api.getPlanInstallments(this.id).subscribe((res: any) => {
      this.planInstallmentsDataSource = new MatTableDataSource<PlanInstallment>(res);
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.planInstallmentsSelection.selected.length;
    const numRows = this.planInstallmentsDataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.planInstallmentsSelection.clear();
      return;
    }

    this.planInstallmentsSelection.select(...this.planInstallmentsDataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PlanInstallment): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }

    const rowIndex = this.planInstallmentsDataSource.data.indexOf(row) + 1;
    return `${
      this.planInstallmentsSelection.isSelected(row) ? 'deselect' : 'select'
    } row ${rowIndex}`;
  }

  onPayment() {
    console.log('*** selection', this.planInstallmentsSelection.selected);
    // TODO: Add elements to cartService
    //this._router.navigateByUrl('/payment/checkout')
  }

  /**
   * Periods Table
   */

    getPlanPeriods() {
      this._api.getPlanPeriods(this.id).subscribe((res: any) => {
        this.planPeriodsDataSource = new MatTableDataSource<PlanPeriod>(res);
      });
    }

}
