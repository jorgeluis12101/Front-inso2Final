import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-deuda',
  templateUrl: './registrar-deuda.component.html',
  styleUrls: ['./registrar-deuda.component.css']
})
export class RegistrarDeudaComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private snackBar: MatSnackBar, private location: Location,private router: Router) {
    this.registerForm = this.fb.group({
      numberDocument: ['', Validators.required],
      company: ['', Validators.required],
      amount: ['', Validators.required],
      dateExpiration: ['', Validators.required],
      clientName: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      invoiceDetails: this.fb.array([]),
    });
  }

  ngOnInit(): void {}

  createInvoiceDetail(): FormGroup {
    return this.fb.group({
      product: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
    });
  }

  get invoiceDetails(): FormArray {
    return this.registerForm.get('invoiceDetails') as FormArray;
  }

  addInvoiceDetail() {
    this.invoiceDetails.push(this.createInvoiceDetail());
  }

  removeInvoiceDetail(index: number) {
    this.invoiceDetails.removeAt(index);
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const token = localStorage.getItem('token');
      if (token) {
        const formData = this.registerForm.value;
        this.authService.registerInvoiceDebt(formData, token).subscribe(
          response => {
            console.log('Registro exitoso');
            this.snackBar.open('Registro exitoso', 'Cerrar', {
              duration: 3000,
            });
          },
          (error: HttpErrorResponse) => {
            console.error('Error en el registro', error.message);
            this.snackBar.open('Error en el registro', 'Cerrar', {
              duration: 3000,
            });
          }
        );
      } else {
        console.error('Token no disponible');
        this.snackBar.open('Token no disponible', 'Cerrar', {
          duration: 3000,
        });
      }
    } else {
      this.snackBar.open('Formulario inválido. Por favor, revisa los campos requeridos.', 'Cerrar', {
        duration: 3000,
      });
    }
  }

  goBack() {
    this.location.back();
  }

  logout() {
    // Aquí va la lógica para cerrar sesión, por ejemplo, eliminar el token de autenticación
    localStorage.removeItem('authToken');
    // Navegar a la página de inicio de sesión u otra página
    this.router.navigate(['/login-registro']);
  }
}
