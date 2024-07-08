import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-registro',
  templateUrl: './login-registro.component.html',
  styleUrls: ['./login-registro.component.css']
})
export class LoginRegistroComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  isLogin: boolean = true;
  isDarkTheme: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  toggleForm(form: string): void {
    this.isLogin = form === 'login';
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    const overlayContainerClasses = document.body.classList;
    if (this.isDarkTheme) {
      overlayContainerClasses.add('dark-theme');
    } else {
      overlayContainerClasses.remove('dark-theme');
    }
  }

  onSubmitLogin(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(response => {
        Swal.fire({
          icon: 'success',
          title: 'Logged in successfully',
          showConfirmButton: false,
          timer: 3000
        });
        this.router.navigate(['/user']);  // Cambia '/user' a la ruta que desees redirigir
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Login failed',
          text: error.error.message,
          showConfirmButton: false,
          timer: 3000
        });
      });
    }
  }

  onSubmitRegister(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(response => {
        Swal.fire({
          icon: 'success',
          title: 'Registered successfully',
          showConfirmButton: false,
          timer: 3000
        });
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Registration failed',
          text: error.error.message,
          showConfirmButton: false,
          timer: 3000
        });
      });
    }
  }
}
