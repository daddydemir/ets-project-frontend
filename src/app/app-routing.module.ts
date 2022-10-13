import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OtelReservationComponent } from './components/otel-reservation/otel-reservation.component';
import { PlaneTicketComponent } from './components/plane-ticket/plane-ticket.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'register',
    pathMatch: 'full',
    component: RegisterComponent,
  },
  {
    path: 'home',
    pathMatch: 'full',
    component:HomeComponent
  },
  {
    path: 'otel-reservation',
    pathMatch: 'full',
    component:OtelReservationComponent,
  },
  {
    path: 'plane-ticket',
    pathMatch: 'full',
    component:PlaneTicketComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
