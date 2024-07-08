import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrardeuda4',
  templateUrl: './registrardeuda4.component.html',
  styleUrls: ['./registrardeuda4.component.css']
})
export class Registrardeuda4Component {
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private location: Location,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      numberDocument: ['', Validators.required],
      company: ['', Validators.required],
      amount: ['', Validators.required],
      dateExpiration: ['', Validators.required],
      period: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  goBack(): void {
    this.location.back(); // Método para navegar hacia atrás
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.registerTaxDebt(this.registerForm.value).subscribe(
        response => {
          console.log('Deuda fiscal registrada exitosamente', response.message);
        },
        error => {
          console.error('Error al registrar la deuda fiscal', error);
        }
      );
    }
  }

  logout() {
    // Aquí va la lógica para cerrar sesión, por ejemplo, eliminar el token de autenticación
    localStorage.removeItem('authToken');
    // Navegar a la página de inicio de sesión u otra página
    this.router.navigate(['/login-registro']);
  }
}
