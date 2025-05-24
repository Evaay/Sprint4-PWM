import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { AlertController } from '@ionic/angular';

import {User} from '../../models/user.interface';
import {IonAlert, NavController} from "@ionic/angular/standalone";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    ReactiveFormsModule,
    RouterLink,
    IonAlert,
  ]
})
export class LoginComponent implements OnInit { // Implementa OnInit
  private authService = inject(AuthService);
  alertHeader: string = "";
  alertMessage: string = "";
  alertButton = ['OK'];
  constructor(
    private alertController: AlertController,
    private navCtrl: NavController
  ) {}

  formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);

  form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-zñ])(?=.*[A-ZÑ])(?=.*\d)(?=.*[.$@$!%*?&])[A-Za-zÑñ\d.$@$!%*?&]+$/)]],
  });

  user!: User;

  ngOnInit(): void {
    this.form.reset(); // Asegúrate de tener esta línea
  }

  async onSubmit() {
    console.log('Button clicked');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.user = {...this.user, ...this.form.value};

    try {
      await this.authService.signIn(this.user);
      this.form.reset();
      this.alertHeader = "Éxito"
      this.alertMessage = "Hola de nuevo";
      this.navCtrl.navigateForward('home');
    } catch(error) {
      this.alertHeader = 'Error';
      this.alertMessage = 'El usuario no existe o contraseña incorrecta';
    }
  }


  get isFormTouchedAndInvalid() {
    return this.form.invalid && this.form.touched;
  }
}
