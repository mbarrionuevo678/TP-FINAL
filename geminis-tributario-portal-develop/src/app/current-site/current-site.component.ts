import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-current-site',
  templateUrl: './current-site.component.html',
  styleUrls: ['./current-site.component.scss'],
})
export class CurrentSiteComponent {
  fragment: string = '';
  url: string = '';
  
  constructor(private _route: ActivatedRoute){
    this._route.queryParamMap.subscribe((res: any) => {
      console.log('*** res', res);
      this.fragment = res.params['fragment'];
      this.url = `${environment.legacySiteUrl}${this.fragment}&no-menu=1`;
    });
  }
}
