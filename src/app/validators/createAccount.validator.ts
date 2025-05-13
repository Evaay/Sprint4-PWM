import {AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn} from '@angular/forms';
import {UserService} from '../services/user.service'
import {map, take} from 'rxjs';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const passwordConfirmation = control.get('password_confirmation');
  if (!password || !passwordConfirmation) {
    return null;
  }
  return password.value === passwordConfirmation.value ? null : { passwordMismatch: true };
};

export const dateFutureValidatorControl: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (!control.value) return null; // si no hay fecha, no validar todavía

  const birthdayValue = new Date(control.value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (birthdayValue > today) {
    return { futureDate: true };
  }
  return null;
};

export const dateValidValidatorControl: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (!control.value) return null; // si no hay fecha, no validar todavía

  const birthdayValue = new Date(control.value);
  const today = new Date();
  const twelveYearsAgo = new Date();
  twelveYearsAgo.setFullYear(today.getFullYear() - 12);
  today.setHours(0, 0, 0, 0);
  twelveYearsAgo.setHours(0, 0, 0, 0);

  if (birthdayValue > twelveYearsAgo) {
    return { tooYoung: true };
  }
  return null;
};

//validador asicrono pq necesita consultar a firestore y
//esperar por esa respuesta
export function userNameExistsValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return userService.getUsers().pipe(
      take(1),
      map(users => {
        const exists = users.find(user => user.name === control.value);
        return exists ? { userNameExists: true } : null;
      })
    );
  };
}
