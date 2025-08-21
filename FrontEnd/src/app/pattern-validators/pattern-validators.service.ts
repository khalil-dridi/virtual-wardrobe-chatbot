import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PatternValidatorsService {

  static patternValidators(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        // Si le contrôle est vide
        return null
      }
       // Tester la valeur
       const valid = regex.test(control.value);
       // Retourner null si valide, sinon retourner l'erreur
       return valid ? null : error;
     };
   }


}
