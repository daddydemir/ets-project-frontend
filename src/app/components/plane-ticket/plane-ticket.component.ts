import { Component, OnInit } from '@angular/core';
import { Flight } from 'src/app/models/flight';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlaneTicketService } from 'src/app/services/planeTicket.service';
import { FlightDto } from 'src/app/models/flightDto';
import { PlaneService } from 'src/app/services/plane.service';
import { Plane } from 'src/app/models/plane';
import { delay } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';

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
    private service: PlaneTicketService,
    private planeSevice: PlaneService
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

  test = async() => {
    const liste: Plane[] = [];

    await this.planeSevice.getAll().then(item => {
      liste.push(item?.data[0]!);
      console.log(item?.data[0]!);
    });


    console.log("size :" + liste.length);
  }

  searchFlight = async() => { 
    this.test();
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
          response.data?.forEach(function (i: Flight) {
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

    const planes: Plane[] = [];

    await this.planeSevice.getAll().then(item => {
      planes.push(item?.data[0]!);
    });

  

    liste.forEach( function (item: Flight) {
      for(let i=0; i< planes.length; i++){
        if(planes[i].id === item.planeId){
          item.plane = planes[i];
        }
      }
    });
    this.array = liste;
  }

}
