import { Component, inject } from '@angular/core';
import {FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  passwordMatchValidator,
  passwordMatchFirebaseValidator
} from '../../validators/settingWindow.validator'
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  imports: [
    ReactiveFormsModule
  ]
})
export class SettingsComponent  {
  private authService = inject(AuthService);
  private router = inject(Router);
  formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);

  constructor(private alertController: AlertController) {}

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

      const alert = await this.alertController.create({
        mode: 'ios',
        header: 'Éxito',
        message: 'Contraseña cambiada correctamente.',
        buttons: ['OK'],
      });
      await alert.present();
    } catch (error) {
      const alert = await this.alertController.create({
        mode: 'ios',
        header: 'Error',
        message: 'No se pudo cambiar la contraseña. Inténtalo más tarde.',
        buttons: ['OK'],
      });
      await alert.present();
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

}
