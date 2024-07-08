import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-registrardeuda2',
  templateUrl: './registrardeuda2.component.html',
  styleUrls: ['./registrardeuda2.component.css']
})
export class Registrardeuda2Component implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private snackBar: MatSnackBar, private location: Location) {
    this.registerForm = this.fb.group({
      numberDocument: ['', Validators.required],
      company: ['', Validators.required],
      amount: ['', Validators.required],
      dateExpiration: ['', Validators.required],
      interestRate: ['', Validators.required],
      termInMonths: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmitLoanDebt() {
    if (this.registerForm.valid) {
      const token = localStorage.getItem('token');
      if (token) {
        const formData = this.registerForm.value;
        console.log('Form Data:', formData); // Log the form data for debugging
        this.authService.registerLoanDebt(formData, token).subscribe(
          response => {
            console.log('Registro exitoso', response);
            this.snackBar.open('Registro exitoso', 'Cerrar', {
              duration: 3000,
            });
          },
          (error: HttpErrorResponse) => {
            console.error('Error en el registro', error.message);
            this.snackBar.open(`Error en el registro: ${error.message}`, 'Cerrar', {
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
}
