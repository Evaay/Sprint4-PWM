import { Component, inject } from '@angular/core';
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  passwordMatchValidator,
  passwordMatchFirebaseValidator
} from '../../validators/settingWindow.validator'
import {AuthService} from '../../services/auth.service';
import {IonAlert, IonButton, IonInput, IonItem, NavController} from "@ionic/angular/standalone";


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  imports: [
    ReactiveFormsModule,
    IonAlert,
    IonItem,
    IonInput,
    IonButton
  ]
})
export class SettingsComponent  {
  private authService = inject(AuthService);
  alertHeader: string = "";
  alertMessage: string = "";
  alertButton = ['OK'];
  isAlertOpen = false;
  private shouldNavigate = false;
  formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);

  constructor(private navCtrl: NavController) {}

  form: FormGroup = this.formBuilder.group({
    currentPassword: ['', [Validators.required,
      Validators.minLength(8),
      Validators.maxLength(15),
      Validators.pattern(/^(?=.*[a-zñ])(?=.*[A-ZÑ])(?=.*\d)(?=.*[.$@$!%*?&])[A-Za-zÑñ\d.$@$!%*?&]+$/)],
      [passwordMatchFirebaseValidator(this.authService)]],
    newPassword: ['', [Validators.required,
      Validators.minLength(8),
      Validators.maxLength(15),
      Validators.pattern(/^(?=.*[a-zñ])(?=.*[A-ZÑ])(?=.*\d)(?=.*[.$@$!%*?&])[A-Za-zÑñ\d.$@$!%*?&]+$/)]],
    confirmPassword: ['', [Validators.required,
      Validators.minLength(8),
      Validators.maxLength(15),
      Validators.pattern(/^(?=.*[a-zñ])(?=.*[A-ZÑ])(?=.*\d)(?=.*[.$@$!%*?&])[A-Za-zÑñ\d.$@$!%*?&]+$/)]],
  }, {validators: [passwordMatchValidator]});

  async changePassword (){
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    try {
      this.authService.changePassword(this.form.value.newPassword)
      this.form.reset();
      this.alertHeader = 'Éxito';
      this.alertMessage = 'Contraseña cambiada correctamente.';
      this.isAlertOpen = true;
      this.shouldNavigate = true;

    } catch (error) {
      this.alertHeader = 'Error';
      this.alertMessage = 'No se pudo cambiar la contraseña. Inténtalo más tarde.';
    }
  }

  showPasswordMatchError() {
    return this.form.get('confirmPassword')?.touched &&
      this.form.get('newPassword')?.touched &&
      (this.form.get("newPassword")?.value != "") &&
      (this.form.get('confirmPassword')?.value != "") &&
      this.form.errors?.['passwordMismatch'];
  }

  get isFormTouchedAndInvalid() {
    return this.form.invalid && this.form.touched;
  }

  onAlertDidDismiss() {
    this.isAlertOpen = false; // cierro la alerta
    if (this.shouldNavigate) {
      this.navCtrl.navigateForward('log-in');
    }
  }
}
