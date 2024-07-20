import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ApiService } from 'src/app/core/api.service';
import { NavigationService } from 'src/app/core/navigation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ObjectInfo } from 'src/app/shared/models/object-info.model';
import { UtilsService } from 'src/app/core/utils.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/shared/dialogs/alert/alert.component';

export interface Debt {
  period: string;
  expiration: string;
  nominal: number;
  recharge: number;
  discount: number;
  penalty: number;
  status: string;
  total: number;
}
export interface Payment {
  period: string;
  payment: string;
  nominal: number;
  recharge: number;
  discount: number;
  penalty: number;
  total: number;
}
export interface Plan {
  id: string,
  title: string,
  createdAt: string,
  installments: number,
  capital: number,
  accessor: number,
  status: string,
  total: number
}
export interface Penalty {
  id: string,
  title: string,
  createdAt: string,
  base: number,
  recharge: number,
  discount: number,
  total: number,
  link: string
}
export interface Lawsuit {
  id: number,
  createdAt: string,
  title: string,
  caseFile: string,
  capital: number,
  expenses: number
}

@Component({
  selector: 'app-tax-item',
  templateUrl: './tax-item.component.html',
  styleUrls: ['./tax-item.component.scss'],
})
export class TaxItemComponent implements OnInit {
  id!: number;
  objectType: string | null = '';
  plans: Plan[] = [];
  penalties: Penalty[] = [];
  lawsuits: Lawsuit[] = [];
  objectInfo = {} as ObjectInfo;

  // Debt Table Config
  debtDisplayedColumns: string[] = [
    'select',
    'period',
    'expiration',
    'nominal',
    'recharge',
    'discount',
    'penalty',
    'total',
  ];
  debtDataSource = new MatTableDataSource<Debt>([]);
  debtSelection = new SelectionModel<Debt>(true, []);

  // Payment Table Config
  paymentInfoData: any;
  paymentDisplayedColumns: string[] = [
    'period',
    'payment',
    'nominal',
    'recharge',
    'discount',
    'penalty',
    'total',
  ];
  paymentDataSource = new MatTableDataSource<Payment>([]);

  constructor(
    private _api: ApiService,
    private _navigationService: NavigationService,
    private _route: ActivatedRoute,
    private _router: Router,
    public _utilsService: UtilsService,
    public dialog: MatDialog
  ) {
    this._route.params.subscribe((res) => {
      this.objectType = res['objectType'];
      this.id = res['id'];
      this._navigationService.setTitle({ title: `Detalle ${this.objectType}` });
    });
    /**
     * Only to test loader
     */
    _utilsService.showLoader()
    setTimeout(() => {
      _utilsService.hideLoader()
    }, 1000);

  }

  ngOnInit(): void {
    // TODO: ForkJoin, todas deben enviar ID
    this.getDebts();
    this.getPayments();
    this.getPlans();
    this.getPenalties();
    this.getLawsuits();
    this.getObjectInfo();
  }

  getObjectInfo() {
    this._api.getObjectInfo(this.id).subscribe((res) => {
      this.objectInfo = res as ObjectInfo;
    });
  }

  /**
   * Debt Table
   */

  getDebts() {
    this._api.getDebts().subscribe((res: any) => {
      this.debtDataSource = new MatTableDataSource<Debt>(res);
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.debtSelection.selected.length;
    const numRows = this.debtDataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.debtSelection.clear();
      return;
    }

    this.debtSelection.select(...this.debtDataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Debt): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }

    const rowIndex = this.debtDataSource.data.indexOf(row) + 1;
    return `${
      this.debtSelection.isSelected(row) ? 'deselect' : 'select'
    } row ${rowIndex}`;
  }

  onPayment() {
    console.log('*** selection', this.debtSelection.selected);
    // TODO: Add elements to cartService
    this._router.navigateByUrl('/payment/checkout')
  }

  onShowDebtInformation() {
    const dialogRef = this.dialog.open(AlertComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  /**
   * Payment Tab
   */

  getPayments() {
    this._api.getPayments().subscribe((res: any) => {
      console.log('*** getPayments', res);
      this.paymentDataSource = new MatTableDataSource<Payment>(res);
    });
  }

  /**
   * Plans Tab
   */

  getPlans() {
    this._api.getPlans().subscribe((res) => {
      console.log('*** getPlans ', res);
      this.plans = res as Plan[];
    });
  }
  onShowPlan() {
    //TODO: Falta Plan id
    this._router.navigateByUrl(`/tax/plan-detail/${this.objectType}/${this.id}/12`)
  }
  /**
   * Penalties Tab
   */

  getPenalties() {
    this._api.getPenalties().subscribe((res) => {
      console.log('*** getPenalties ', res);
      this.penalties = res as Penalty[];
    });
  }
  onOpenDocument(link: string) {
    window.open(link, '_blank');
  }

  /**
   * Lawsuits Tab
   */

  getLawsuits() {
    this._api.getLawsuits().subscribe((res) => {
      console.log('*** getLawsuits ', res);
      this.lawsuits = res as Lawsuit[];
    });
  }
}
