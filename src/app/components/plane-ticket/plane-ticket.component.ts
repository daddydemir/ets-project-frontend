import { Component, OnInit } from '@angular/core';
import { Flight } from 'src/app/models/flight';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlaneTicketService } from 'src/app/services/planeTicket.service';
import { FlightDto } from 'src/app/models/flightDto';

@Component({
  selector: 'app-plane-ticket',
  templateUrl: './plane-ticket.component.html',
  styleUrls: ['./plane-ticket.component.css']
})
export class PlaneTicketComponent implements OnInit {
  planeTicketForm!: FormGroup;

  array: Flight[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private service: PlaneTicketService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.planeTicketForm = this.formBuilder.group({
      "departurePoint": ['', [Validators.required]],
      "destination": ['', [Validators.required]],
      "departureTime": ['', [Validators.required]],
      "people": ['', [Validators.required]],
      "seat": ['', [Validators.required]],
    });
  }

  searchFlight(){
    const flight: FlightDto = {};
    let data = Object.assign({}, this.planeTicketForm.value);
    if(data.seat === "business"){
      flight.business = data.people;
      flight.economy = 0;
    }else if(data.seat === "economy"){
      flight.business = 0;
      flight.economy = data.people;
    }else if(data.seat === "any"){
      flight.business = 1;
      flight.economy = 1;
    }
    
    flight.from = data.departurePoint;
    flight.to = data.destination;
    flight.time = data.departureTime;


    const liste: Flight[] = [];

    if(this.planeTicketForm.valid){
      this.service.search(flight).subscribe(
        (response) => {
          console.log(response);
          response.data.forEach(function (this:Flight, i: Flight) {
            liste.push(i);
            console.log(i.expeditionNo);
          });
        },
        (responseError) =>{
          console.log(responseError.error.message);
        }
      );
    }else{
      alert("Eksik alanları lütfen doldurun.");
    }
    this.array = liste;
  }

}
