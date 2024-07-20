import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../core/navigation.service';
import { ApiService } from '../core/api.service';
import { ActivatedRoute } from '@angular/router';
import { ObjectInfo } from 'src/app/shared/models/object-info.model';
import { MatTableDataSource } from '@angular/material/table';

export interface LawSuiteInfo {
  id: number,
  judicial_file: number,
  order: number,
  year: number,
  object: string,
  status: string,
  identification: string,
  cuit: number,
  assignement: string,
  attorney: string,
  caption: string,
  court: string,
  created_date: number,
  start_date: number 
}
export interface LawSuiteInstance {
  id: number,
  order: number,
  date: number,
  type: number,
  updated: number
}

@Component({
  selector: 'app-lawsuite',
  templateUrl: './lawsuite.component.html',
  styleUrls: ['./lawsuite.component.scss']
})
export class LawsuiteComponent implements OnInit {
  objectInfo = {} as ObjectInfo;
  id!: number;

  // Periods Table Config
  lawSuiteInstancesDisplayedColumns: string[] = [
    'order',
    'date',
    'type',
    'updated'
  ];
  lawSuiteInstancesDataSource = new MatTableDataSource<LawSuiteInstance>([]);

  constructor(
    private _api: ApiService,
    private _navigationService: NavigationService,
    private _route: ActivatedRoute
  ) {
    this._route.params.subscribe((res) => {
      this.id = res['id'];
      this._navigationService.setTitle({ title: `Consulta Procuración` });
    });
  }
  ngOnInit(): void {
   this.getObjectInfo();   
  }
  getObjectInfo() {
    this._api.getObjectInfo(this.id).subscribe((res) => {
      this.objectInfo = res as ObjectInfo;
    });
  }

}
