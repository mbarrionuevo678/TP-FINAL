import { AbstractControl, ValidatorFn } from '@angular/forms';

/**
 * Validador personalizado para números de CUIT (Clave Única de Identificación Tributaria) en Argentina.
 * Valida si el número de CUIT proporcionado cumple con el formato especificado.
 * El CUIT debe tener 11 dígitos y seguir el formato XX-XXXXXXXX-X o XXXXXXXXXXXX, donde X es un dígito del 0 al 9.
 * Los primeros dos dígitos representan el tipo de entidad (por ejemplo, 20 para personas físicas).
 * @returns Un objeto con una clave 'invalidCuit' si el CUIT no es válido, o null si es válido.
 */

export function cuitValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const cuit = control.value;

    const regexCuit = /^(20|23|27|30|33)([0-9]{9}|-[0-9]{8}-[0-9]{1})$/;

    if (!regexCuit.test(cuit)) {
      return { invalidCuit: true };
    }

    return null; // Retorna null si el CUIT es válido
  };
}

/**
 * Validador de designación catastral
 * Valida caracteres numéricos y la longitud es de 1 a 18 caracteres
 * @returns Un objeto con una clave 'invalidCadastralDesignation' si es válido, o null si es válido.
 */

export function cadastralDesignation(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const cadastralDesignation = control.value;

    const regexCadastral = /^[0-9]{18}$/;

    if (!regexCadastral.test(cadastralDesignation)) {
      return { invalidCadastralDesignation: true };
    }

    return null;
  };
}

/**
 * Validador de designación de cementerio
 * Valida caracteres numéricos y la longitud es de 1 a 16 caracteres
 * @returns Un objeto con una clave 'invalidCementeryDesignation' si es válido, o null si es válido.
 */

export function cementeryDesignation(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const cementeryDesignation = control.value;

    const regexCementery = /^[0-9]{16}$/;

    if (!regexCementery.test(cementeryDesignation)) {
      return { invalidCementeryDesignation: true };
    }

    return null;
  };
}
/**
 * Validador de designación de dominio automotor
 * Valida que el dominio ingresado sea de la forma AA123AA o AAA123
 * @returns Un objeto con una clave 'invalidCarDomain' si es válido, o null si es válido.
 */

export function carDomain(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const carDomain = control.value;

    const regexDomain = /^(?:[A-Za-z]{2}\d{3}[A-Za-z]{2}|[A-Za-z]{3}\d{3})$/;

    if (!regexDomain.test(carDomain)) {
      return { invalidCarDomain: true };
    }

    return null;
  };
}

/**
 * Validador de designación de dominio vehicular (AUTOS Y MOTOS)
 * Valida que el dominio ingresado sea de la forma AA123AA, AAA123, A123VAM, 416UTH
 * @returns Un objeto con una clave 'invalidVehicleDomain' si es válido, o null si es válido.
 */

export function vehicleDomain(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const vehicleDomain = control.value;

    const regexDomain = /^(?:[A-Za-z]{2}\d{3}[A-Za-z]{2}|[A-Za-z]{3}\d{3}|[A-Za-z]\d{3}[A-Za-z]{3}|\d{3}[A-Za-z]{3})$/i;

    if (!regexDomain.test(vehicleDomain)) {
      return { invalidVehicleDomain: true };
    }

    return null;
  };
}



