import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
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
        console.log('Logged in successfully');
        this.router.navigate(['/user']);  // Cambia '/home' a la ruta que desees redirigir
      }, error => {
        console.error('Login failed', error);
      });
    }
  }

  onSubmitRegister(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(response => {
        console.log('Registered successfully');
      }, error => {
        console.error('Registration failed', error);
      });
    }
  }
}
