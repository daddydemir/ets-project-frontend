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
  day: number = 1;

  last_day!: Date;
  
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
      "startDate": ['', [Validators.required]],
      "endDate": ['', [Validators.required]],
    });

    this.init();

  }

  _change(d: Date){

    this.day = 1; 
    // const time: Date = this.form.get('endDate') || new Date();
    const firstDay: Date = new Date(this.form.value['startDate']);
    const lastDay: Date = new Date(this.form.value['endDate']);
    this.day = lastDay.getDate() - firstDay.getDate();

    if(!this.form.valid){
      this.day = 1;
    }
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


  send(){
    console.log(this.form.value);

    const model: ReservationAdd = Object.assign({}, this.form.value);

    model.customerId = Number(localStorage.getItem('customerId'));
    model.hotelId = this.id || -1;

    console.log(model);
    
    this.service.addReservation(model).then(
      item => {
        if(item?.success){
          alert(item.message);
          window.location.href = "/my-reservations";
        }else{
          console.log(item);
        }
        console.log(item);
      }
    );
  }

}
