import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/models/address';
import { Hotel } from 'src/app/models/hotel';
import { Reservation } from 'src/app/models/reservation';
import { ReservationService } from 'src/app/services/reservation.service';


@Component({
  selector: 'app-otel-reservation',
  templateUrl: './otel-reservation.component.html',
  styleUrls: ['./otel-reservation.component.css']
})
export class OtelReservationComponent implements OnInit {

  form!: FormGroup;
  array: Reservation[] = [];
  res: Reservation = {};


  constructor(
    private formBuilder: FormBuilder,
    private service: ReservationService,
  ) { }

  ngOnInit(): void {
  this._createForm();
  }

  _createForm(){
    this.form = this.formBuilder.group({
      "city": ['', [Validators.required]],
      "startDate": ['' , [Validators.required]],
      "endDate": ['' , [Validators.required]],
      "adult": ['' , [Validators.required]],
      "child": ['' , [Validators.required]],
    });
  }

  search = async () => {
    
    let model = Object.assign({}, this.form.value);

    await this.service.search(model).then(
      item => {
        if(item?.success){
          console.log(item.data);
        }
      }
    );
  }

  test () {
    
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
    this.array.push(this.res);
    this.array.push(this.res);
  }

}
