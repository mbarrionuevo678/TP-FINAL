import { Component, OnInit } from '@angular/core';
import { cuitValidator, cadastralDesignation, vehicleDomain, cementeryDesignation } from 'src/app/shared/validators/form.validator';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from 'src/app/core/navigation.service';

@Component({
  selector: 'app-tax-search',
  templateUrl: './tax-search.component.html',
  styleUrls: ['./tax-search.component.scss'],
})
export class TaxSearchComponent implements OnInit {
  searchForm: FormGroup;
  objectType: string = '';
  objectInfo: any;
  objectInfoData = [
    {
      name: 'comercio',
      title: 'Ingrese su CUIT',
      type: 'CUIT',
      placeholder: 'Ej: 20254567890',
      description:
        'Ingrese el número de CUIT de su Comercio o Industria, con el Digito Verificador, pero sin espacios, ni barras, ni guiones, ni puntos.',
    },
    {
      name: 'automotor',
      title: 'Ingrese su dominio',
      type: 'Dominio',
      placeholder: 'Ej: AC789KL',
      description: 'Ingrese la patente del automotor, sin espacios.',
    },
    {
      name: 'inmueble',
      title: 'Ingrese su identificador',
      type: 'Designación Catastral',
      placeholder: '12345678',
      description:
        'Ingrese los primeros 18 números de la Designación Catastral, sin el dígito verificador, ni espacios, ni guiones, ni puntos.',
    },
    {
      name: 'cementerio',
      title: 'Ingrese su identificador',
      type: 'Identificador',
      placeholder: '12345678',
      description:
        'Ingrese 16 números para cementerios Privados o dieciseis números para cementerios Municipales, sin el Dígito Verificador, ni espacios, ni guiones, ni puntos.',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private recaptchaV3Service: ReCaptchaV3Service,
    private _router: Router,
    private _route: ActivatedRoute,
    private _navigationService: NavigationService
  ) {
    this.searchForm = this.fb.group({
      id: ['', [Validators.required]],
    });

    // Recibe el tipo de objeto: automotor, inmueble, comercio, cementerio
    this._route.params.subscribe((res) => {
      this._navigationService.setTitle({
        title: `Búsqueda por ${res['objectType']}`,
      });
      this.objectType = res['objectType'];
      this.objectInfo = this.objectInfoData.find(item => item.name == this.objectType);
      this.setValidator(this.objectType);

    });
  }

  ngOnInit(): void {}

  setValidator(objectType: string) {
    this.searchForm.reset();
    switch (objectType) {
      case 'comercio':
        this.searchForm.controls['id'].setValidators([
          Validators.required,
          cuitValidator(),
        ]);
        break;
      case 'automotor':
        this.searchForm.controls['id'].setValidators([
          Validators.required,
          vehicleDomain()
        ]);
        break;
      case 'inmueble':
        this.searchForm.controls['id'].setValidators([
          Validators.required,
          cadastralDesignation()
        ]);
        break;
      case 'cementerio':
        this.searchForm.controls['id'].setValidators([
          Validators.required,
          cementeryDesignation()
        ]);
        break;

      default:
        break;
    }
  }

  onSubmit() {
    console.log(`Recaptcha v3 execution requested...`);
    this.recaptchaV3Service.execute('onSubmit').subscribe(
      (token: string) => {
        console.log(`Token [${token}] generated`);
      },
      (error) => {
        console.log(`Recaptcha v3 error:`, error);
      }
    );
    const id = this.searchForm.get('id')?.value;
    // Service call
    this._router.navigateByUrl(`/tax/tax-item/${this.objectType}/${id}`);
  }
}
