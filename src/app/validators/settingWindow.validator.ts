import {AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn} from '@angular/forms';
import {from, map, of} from 'rxjs';
import {AuthService} from '../services/auth.service';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('newPassword');
  const passwordConfirmation = control.get('confirmPassword');
  if (!password || !passwordConfirmation) {
    return null;
  }
  return password.value === passwordConfirmation.value ? null : { passwordMismatch: true };
};

export function passwordMatchFirebaseValidator(authService: AuthService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const password = control.value;

    if (!password) {
      return of(null); // <-- aquí se evita la validación si está vacío
    }

    return from(authService.verificationCredentials(password)).pipe(
      map((isValid: boolean) => {
        return isValid ? null : { incorrectPassword: true };
      })
    );
  };
}

