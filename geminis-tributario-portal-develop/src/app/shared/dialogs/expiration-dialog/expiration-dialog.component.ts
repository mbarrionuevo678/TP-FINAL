import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { UtilsService } from 'src/app/core/utils.service';

@Component({
  selector: 'app-expiration-dialog',
  templateUrl: './expiration-dialog.component.html',
  styleUrls: ['./expiration-dialog.component.scss']
})
export class ExpirationDialogComponent implements OnInit {
  expirations: any
  constructor(private _api: ApiService, private _utilsService: UtilsService){}

  ngOnInit(): void {
    this._utilsService.showLoader();
    this._api.getExpirations().subscribe(res => {
      this._utilsService.hideLoader()
      this.expirations = res;
    })
  }

}
