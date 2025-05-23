import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { AlertController } from '@ionic/angular';

import {User} from '../../models/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    ReactiveFormsModule,
    RouterLink
  ]
})
export class LoginComponent implements OnInit { // Implementa OnInit
  private authService = inject(AuthService);
  private router = inject(Router);
  constructor(private alertController: AlertController) {}

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
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.user = {...this.user, ...this.form.value};

    try {
      await this.authService.signIn(this.user);
      this.form.reset();
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Hola nuevamente',
        buttons: ['OK'],
      });
      await alert.present();
      this.router.navigate(['home']);
    } catch(error) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'El usuario no existe o contraseña incorrecta',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  get isFormTouchedAndInvalid() {
    return this.form.invalid && this.form.touched;
  }
}
