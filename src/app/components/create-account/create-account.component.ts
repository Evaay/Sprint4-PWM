import {Component, inject} from '@angular/core';
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {User} from "../../models/user.interface";
import {
  dateFutureValidatorControl,
  dateValidValidatorControl, passwordMatchValidator,
  userNameExistsValidator
} from "../../validators/createAccount.validator";
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-create-account',
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.scss'],
    imports: [
        ReactiveFormsModule
    ]
})
export class CreateAccountComponent {
  //Inyectamos los servicios a emplear para poder sincronizar los datos
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);
  constructor(private alertController: AlertController) {}


  //Estructura del usuario de firestore
  user: User = {
    email: '',
    name: '',
    birthday: '',
    profilePhoto: 'assets/images/icons/0.jpg',
    contact: [],
    request: [],
    chat: {}
  }

  //Definición del formulario
  formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder); //no va a permitir que sea nulo

  form: FormGroup = this.formBuilder.group({
    //email: ['', [Validators.required, Validators.pattern(/^(?=[^@]*[a-zA-Z])([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)]], //nunca será null, solo string
    email: ['', [Validators.required, Validators.email]], //nunca será null, solo string
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern(/^(?=.*[a-zñ])(?=.*[A-ZÑ])(?=.*\d)(?=.*[.$@$!%*?&])[A-Za-zÑñ\d.$@$!%*?&]+$/)]],
    password_confirmation: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern(/^(?=.*[a-zñ])(?=.*[A-ZÑ])(?=.*\d)(?=.*[.$@$!%*?&])[A-Za-zÑñ\d.$@$!%*?&]+$/)]],
    name: ['', [Validators.required], [userNameExistsValidator(this.userService)]],
    birthday: ['', [Validators.required, dateFutureValidatorControl, dateValidValidatorControl]],
  }, {validators: [passwordMatchValidator]});

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.user = {...this.user, ...this.form.value};

    try {
      this.authService.signUp(this.user);
      this.form.reset();
      const alert = await this.alertController.create({
        mode: 'ios',
        header: 'Éxito',
        message: 'Usuario creado correctamente',
        buttons: ['OK'],
      });
      await alert.present();
      this.router.navigate(['login']);
    } catch (error) {
      const alert = await this.alertController.create({
        mode: 'ios',
        header: 'Error',
        message: 'No se ha podido crear el usuario',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  showPasswordMatchError() {
    return this.form.get('password_confirmation')?.touched &&
      this.form.get('password_confirmation')?.dirty &&
      this.form.get('password')?.touched &&
      (this.form.get("password")?.value != "") &&
      (this.form.get('password_confirmation')?.value != "") &&
      this.form.errors?.['passwordMismatch'];
  }

  formatDateForMax(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}
