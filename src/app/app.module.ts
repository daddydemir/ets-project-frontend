import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { OtelReservationComponent } from './components/otel-reservation/otel-reservation.component';
import { PlaneTicketComponent } from './components/plane-ticket/plane-ticket.component';
import { FlightDetailComponent } from './components/flight-detail/flight-detail.component';
import { MyTicketsComponent } from './components/my-tickets/my-tickets.component';
import { OtelDetailComponent } from './components/otel-detail/otel-detail.component';
import { TestComponent } from './components/test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    OtelReservationComponent,
    PlaneTicketComponent,
    FlightDetailComponent,
    MyTicketsComponent,
    OtelDetailComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
