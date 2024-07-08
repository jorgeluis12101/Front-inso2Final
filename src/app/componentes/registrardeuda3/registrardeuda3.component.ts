import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrardeuda3',
  templateUrl: './registrardeuda3.component.html',
  styleUrls: ['./registrardeuda3.component.css']
})
export class Registrardeuda3Component {
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private location: Location ,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      numberDocument: ['', Validators.required],
      company: ['', Validators.required],
      amount: ['', Validators.required],
      dateExpiration: ['', Validators.required],
      clientName: ['', Validators.required],
      clientAddress: ['', Validators.required]
    });
  }

  goBack(): void {
    this.location.back(); // Método para navegar hacia atrás
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.registerUtilityBill(this.registerForm.value).subscribe(
        response => {
          console.log('Factura de servicio registrada exitosamente', response.message);
        },
        error => {
          console.error('Error al registrar la factura de servicio', error);
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
