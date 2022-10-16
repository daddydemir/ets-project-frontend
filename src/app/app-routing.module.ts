import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightDetailComponent } from './components/flight-detail/flight-detail.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MyTicketsComponent } from './components/my-tickets/my-tickets.component';
import { OtelDetailComponent } from './components/otel-detail/otel-detail.component';
import { OtelReservationComponent } from './components/otel-reservation/otel-reservation.component';
import { PlaneTicketComponent } from './components/plane-ticket/plane-ticket.component';
import { RegisterComponent } from './components/register/register.component';
import { TestComponent } from './components/test/test.component';

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
  },
  {
    path:'flight/:id',
    pathMatch: 'full',
    component: FlightDetailComponent,
  },
  {
    path: 'my-tickets',
    pathMatch: 'full',
    component: MyTicketsComponent
  },
  {
    path: 'hotels/:id',
    pathMatch: 'full',
    component: OtelDetailComponent,
  },
  {
    path: 'test',
    pathMatch: 'full',
    component: TestComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
