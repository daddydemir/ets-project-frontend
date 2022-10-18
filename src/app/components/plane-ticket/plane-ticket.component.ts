import { Component, OnInit } from '@angular/core';
import { Flight } from 'src/app/models/flight';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlaneTicketService } from 'src/app/services/planeTicket.service';
import { FlightDto } from 'src/app/models/flightDto';
import { PlaneService } from 'src/app/services/plane.service';
import { Plane } from 'src/app/models/plane';
import { ElasticService } from 'src/app/services/elastic.service';
import { City } from 'src/app/models/cityModel';

@Component({
  selector: 'app-plane-ticket',
  templateUrl: './plane-ticket.component.html',
  styleUrls: ['./plane-ticket.component.css']
})
export class PlaneTicketComponent implements OnInit {
  planeTicketForm!: FormGroup;

  array: Flight[] = [];
  options = ["izmir","istanbul"];
  filteredFromOptions = [""];
  filteredToOptions = [""];
  mymodel = "";


  constructor(
    private formBuilder: FormBuilder,
    private service: PlaneTicketService,
    private planeSevice: PlaneService,
    private _service: ElasticService
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

    this.planeTicketForm.get('departurePoint')?.valueChanges.subscribe(
      response => {
        this.filterData(response);
      }
    );

    this.planeTicketForm.get('destination')?.valueChanges.subscribe(
      response => {
        this.filterDataTo(response);
      }
    );
  }

  filterData(entered: string){
    this.filteredFromOptions = this.options.filter(
      item => {
        return item.toLowerCase().indexOf(entered.toLowerCase()) > -1;
      }
    );
  }

  filterDataTo(entered: any){
    this.filteredToOptions = this.options.filter(
      item => {
        return item.toLowerCase().indexOf(entered.toLowerCase()) > -1;
      }
    );
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

  valuechange =  async (newValue:string) => {
    this.mymodel = newValue;
    console.log(newValue);
    this.getCities(newValue);
  }

  getCities = async (p: string) => {
    const temp: string[] = [];
    await this._service.getCity(p).then(
      response => {
        if(response?.success){
          this.options = [];
          response.data.forEach(function (item:City) {
            temp.push(item.name);
          });
          console.log(response.data);
        }
      }
    );
    this.options = temp;
  }

}
