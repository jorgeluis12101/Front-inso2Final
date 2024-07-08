import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Importaciones para el enrutamiento de la aplicación
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './componentes/user/user.component';
import { LoginRegistroComponent } from './logueo/login-registro/login-registro.component';

// Importaciones necesarias para Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Requerido para las animaciones de Angular Material
import { MatToolbarModule } from '@angular/material/toolbar'; // Barra de herramientas (nav bar)
import { MatInputModule } from '@angular/material/input'; // Campos de entrada de formularios
import { MatCardModule } from '@angular/material/card'; // Tarjetas para agrupar contenido
import { MatButtonModule } from '@angular/material/button'; // Botones estilizados
import { MatIconModule } from '@angular/material/icon'; // Iconos para los botones y otros componentes
import { MatMenuModule } from '@angular/material/menu'; // Menús desplegables
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; // Toggle para cambiar temas

// Importaciones necesarias para formularios reactivos
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Manejo de formularios

// Importación de Flex Layout para un diseño flexible
import { FlexLayoutModule } from '@angular/flex-layout';

// Servicios
import { AuthService } from './services/auth.service';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { InterceptorService } from '../app/services/interceptor.service';
import { AuthGuard } from './services/user.guard';
import { DashUserComponent } from './componentes/user/dash-user/dash-user.component';
import { RegistrarDeudaComponent } from './componentes/registrar-deuda/registrar-deuda.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Registrardeuda2Component } from './componentes/registrardeuda2/registrardeuda2.component';
import { Registrardeuda3Component } from './componentes/registrardeuda3/registrardeuda3.component';
import { Registrardeuda4Component } from './componentes/registrardeuda4/registrardeuda4.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginRegistroComponent,
    DashUserComponent,
    RegistrarDeudaComponent,
    Registrardeuda2Component,
    Registrardeuda3Component,
    Registrardeuda4Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, // Importa las animaciones necesarias para Angular Material
    FormsModule, // Importa el módulo de formularios
    ReactiveFormsModule, // Importa el módulo de formularios reactivos
    FlexLayoutModule, // Importa Flex Layout para un diseño flexible
    MatToolbarModule, // Importa el módulo de la barra de herramientas de Angular Material
    MatInputModule, // Importa el módulo de entrada de Angular Material
    MatCardModule, // Importa el módulo de tarjetas de Angular Material
    MatButtonModule, // Importa el módulo de botones de Angular Material
    MatIconModule, // Importa el módulo de iconos de Angular Material
    MatMenuModule, // Importa el módulo de menús de Angular Material
    MatSlideToggleModule, // Importa el módulo de toggle para cambiar temas de Angular Material
    HttpClientModule, 
    MatSnackBarModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
