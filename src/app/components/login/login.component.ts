import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink, RouterModule} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';

import {User} from '../../models/user.interface';
import {toast} from 'ngx-sonner';

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

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.user = {...this.user, ...this.form.value};
    this.authService.signIn(this.user)
      .then(() => {
        this.form.reset();
        toast.success('Hola nuevamente');
        this.router.navigate(['home']);
      }).catch(error => {
      toast.error("El usuario no existe o contraseña incorrecta");
    });
  }

  get isFormTouchedAndInvalid() {
    return this.form.invalid && this.form.touched;
  }
}
