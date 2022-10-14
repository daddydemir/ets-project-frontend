import { Component, OnInit } from '@angular/core';
import { Flight } from 'src/app/models/flight';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlaneTicketService } from 'src/app/services/planeTicket.service';
import { FlightDto } from 'src/app/models/flightDto';
import { PlaneService } from 'src/app/services/plane.service';
import { Plane } from 'src/app/models/plane';

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

  test(){
    const f: Flight = {};
    f.id = 2;
    f.departurePoint = 'konya';
    f.destination = 'sivas';
    f.departureTime = new Date();
    
    const p: Plane = {};
    p.brandName = 'Türk hava yolları'
    p.brandImage = 'https://www.turizmgunlugu.com/wp-content/uploads/2020/10/THY-Tu%CC%88rk-Hava-Yollari-Turkish-Airlines-696x398.jpg';
    f.plane = p;
    this.array.push(f);
  }


  searchFlight = async() => { 
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
          response.data?.forEach(function (i: Flight) {
            liste.push(i);
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
      item?.data.forEach(function (i:Plane) {
        planes.push(i);
        alert(i.brandName);
      });
      // planes.push(item?.data[0]!);
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
