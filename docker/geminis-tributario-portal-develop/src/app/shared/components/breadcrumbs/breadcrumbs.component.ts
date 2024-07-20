import { Component, Input, OnInit } from '@angular/core';

interface Step {
  name: String,
  link: String
}

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent {
  @Input() steps: Step[] = [];

}
