import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './componentes/user/user.component';
import { AuthGuard } from './services/user.guard';
import { LoginRegistroComponent } from './logueo/login-registro/login-registro.component';
import { RegistrarDeudaComponent } from './componentes/registrar-deuda/registrar-deuda.component';
import { Registrardeuda2Component } from './componentes/registrardeuda2/registrardeuda2.component';
import { Registrardeuda3Component } from './componentes/registrardeuda3/registrardeuda3.component';
import { Registrardeuda4Component } from './componentes/registrardeuda4/registrardeuda4.component';

const routes: Routes = [
  { path: '', redirectTo: '/login-registro', pathMatch: 'full' },
  { path: 'login-registro', component: LoginRegistroComponent },
  { path: 'registrar-deuda', component: RegistrarDeudaComponent, canActivate: [AuthGuard]},
  { path: 'registrar2', component: Registrardeuda2Component, canActivate: [AuthGuard]},
  { path: 'registrar3', component: Registrardeuda3Component, canActivate: [AuthGuard]},
  { path: 'registrar4', component: Registrardeuda4Component, canActivate: [AuthGuard]},
  {
    path: 'user', component: UserComponent, canActivate: [AuthGuard],
    children: [
      {path: '',  component: UserComponent},


    ]
  },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
