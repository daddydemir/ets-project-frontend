import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Address } from 'src/app/models/address';
import { Hotel } from 'src/app/models/hotel';
import { People } from 'src/app/models/people';
import { Reservation } from 'src/app/models/reservation';
import { ReservationAdd } from 'src/app/models/reservationAdd';
import { Room } from 'src/app/models/room';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-otel-detail',
  templateUrl: './otel-detail.component.html',
  styleUrls: ['./otel-detail.component.css']
})
export class OtelDetailComponent implements OnInit {

  id?: number;
  hotel?: Hotel;

  form!: FormGroup;

  personSize: number = 1;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private service: ReservationService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      item => {
        this.id = item['id'];
      }
    );

    this.form = this.formBuilder.group({
      persons: this.formBuilder.array([this.personForm()]),
    });

    this.init();
  }

  init = async () => {
    await this.service.getOtelsId(this.id || 1).then(
      item => {
        if(item?.success){
          this.hotel = item.data;
          let r: Room[] = item.data.room || [];
          this.hotel.oda = r[0];
        }
      }
    );
  } 

  personForm(){
    return this.formBuilder.group({
      "name": ['', [Validators.required]],
      "surname": ['', [Validators.required]],
      "gender": ['', [Validators.required]],
      "email": ['', [Validators.required]],
      "identityNo": ['', [Validators.required]],
    });
  }

  get persons(){
    return this.form.get("persons") as FormArray;
  }

  addNewPersons(){
    this.personSize += 1; 
    this.persons.push(this.personForm());
  }

  removeLastPersons(){
    this.personSize -= 1;
    this.persons.removeAt(this.persons.length - 1);
  }

  send(){
    console.log(this.form.value);

    const model: ReservationAdd = Object.assign({}, this.form.value);

    model.customerId = Number(localStorage.getItem('customerId'));
    model.hotelId = this.id || -1;
    
    this.service.search(model).then(
      item => {
        console.log(item?.data);
      }
    );
  }

}
