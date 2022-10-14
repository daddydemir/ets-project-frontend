import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Flight } from 'src/app/models/flight';
import { People } from 'src/app/models/people';
import { Plane } from 'src/app/models/plane';
import { PlaneTicketService } from 'src/app/services/planeTicket.service';

@Component({
  selector: 'app-flight-detail',
  templateUrl: './flight-detail.component.html',
  styleUrls: ['./flight-detail.component.css']
})
export class FlightDetailComponent implements OnInit {

  id?:string;
  ucus?: Flight;
  personFrom!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private service: PlaneTicketService,
  ) { }

  ngOnInit(): void {

    let f: Flight = {};
    let p: Plane = {};
    
    this.activatedRoute.params.subscribe( (params => {
      this.id = params['id'];
      // id'yi aldık.
    }));


    this.service.getFlightById(this.id!).then(
      response => {
        if(response?.success){
          // veri geldi.
          this.ucus = response.data;
          f = response.data;
        }else{
          alert("uçuş bulunamadı.");
        }
      }
    );

    //planeId değeri değişecek
    this.service.getPlaneById("1").then(
      item => {
       if(item?.success){
        p = item.data;
        f.plane = p;
        this.ucus = f;
       }
      }
    );
    this.createFrom();
  }

  createFrom(){
    this.personFrom = this.formBuilder.group({
      "name": ['', [Validators.required]],
      "surname": ['', [Validators.required]],
      "identity": ['', [Validators.required]],
      "email": ['', [Validators.required]],
      "gender": ['', [Validators.required]],
    });
  }

  buy = async () => { 

    const p: People = {};

    let data = this.personFrom.value;
    p.email = data.email;
    p.name = data.name;
    p.surname = data.surname;
    p.identityNo = data.identity;
    p.gender = data.gender;

    p.customerId = 3;
    

    await this.service.takeTicket(p).then(
      response => {
        if(response?.success) {

        }
        else{
          alert(response?.message);
        }
        console.log(response?.message);
        alert(response?.message);
      },
      error => {
        console.log(error.error);
        alert(error.error.message);
      }
    );
  }



}
