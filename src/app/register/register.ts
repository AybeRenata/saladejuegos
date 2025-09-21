import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  form: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    this.errorMessage = null;
    if (this.form.valid) {
      try {
        await this.auth.register(
          this.form.value.email,
          this.form.value.password,
          this.form.value.name
        );
      } catch (err: any) {
        console.error('Register error', err);
        if (err && err.code === 'auth/email-already-in-use') {
          this.errorMessage =
            'El correo ya está registrado. Por favor inicie sesión o use otro correo.';
        } else {
          this.errorMessage = 'Error al registrarse. Intente nuevamente.';
        }
        this.form.setErrors({ auth: true });
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  onBack() {
    this.router.navigate(['/login']);
  }
}
