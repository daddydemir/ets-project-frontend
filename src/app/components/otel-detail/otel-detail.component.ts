import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Address } from 'src/app/models/address';
import { Hotel } from 'src/app/models/hotel';
import { People } from 'src/app/models/people';
import { Reservation } from 'src/app/models/reservation';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-otel-detail',
  templateUrl: './otel-detail.component.html',
  styleUrls: ['./otel-detail.component.css']
})
export class OtelDetailComponent implements OnInit {

  id?: string;
  res: Reservation = {};

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

    this.test();
  }

  test(){
    const address: Address = {
      id:1,
      title: "Sivas Otel Adresi",
      city: "Sivas",
      description: "Sivas-Ankara çevre yolu üzerinde..."
    };

    const hotel: Hotel = {
      address: address,
      id: 12,
      name: "Kangal Hotel",
      starSize: 4,
      image: "https://ucdn.tatilbudur.net/Otel/486x290/malia-hotel_283021.jpg",
      information: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      phone: "0545 440 7760"
    };

    this.res = {
      customerId: 3,
      hotel: hotel,
      id: 41,
      price: 400,
      startDate: new Date("10-10-2022"),
      endDate: new Date("30-10-2022"),
      hotelId: 17
    };
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

    this.service.search(new Object).then(
      item => {
        console.log(item?.data);
      }
    );
  }

}
