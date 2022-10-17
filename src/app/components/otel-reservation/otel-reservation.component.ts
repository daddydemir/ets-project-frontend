import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/models/address';
import { Hotel } from 'src/app/models/hotel';
import { Reservation } from 'src/app/models/reservation';
import { ReservationDto } from 'src/app/models/reservationDto';
import { Room } from 'src/app/models/room';
import { ReservationService } from 'src/app/services/reservation.service';


@Component({
  selector: 'app-otel-reservation',
  templateUrl: './otel-reservation.component.html',
  styleUrls: ['./otel-reservation.component.css']
})
export class OtelReservationComponent implements OnInit {

  form!: FormGroup;
  otel: Hotel[] = [];

  day: number = 0;


  constructor(
    private formBuilder: FormBuilder,
    private service: ReservationService,
  ) { }

  ngOnInit(): void {
    this._createForm();
  }

  _createForm() {
    this.form = this.formBuilder.group({
      "city": ['', [Validators.required]],
      "startDate": ['', [Validators.required]],
      "endDate": ['', [Validators.required]],
      "adult": ['', [Validators.required]],
      "child": ['', [Validators.required]],
    });
  }

  search = async () => {

    

    let model = Object.assign({}, this.form.value);
    let s: Date = new Date(this.form.value["startDate"]);
    let d: Date = new Date(this.form.value["endDate"]);
      

    await this.service.search(model).then(
      item => {
        if (!item?.success) {
          alert("Aradığınız kriterde otel bulunamadı.");
        } else {
          item.data.forEach(
            i => {
              let r: Room[] = [];
              r = i.room || [];
              i.oda = r[0];

              this.otel.push(i);
            }
          );
        }
      }
    ); 
    this.day = d.getDate()-s.getDate();
  }

  // getOtel = async (id: number) => {
  //   await this.service.getOtelsId(id).then(
  //     item => {
  //       // console.log(item?.data);
  //       if(item?.success){
  //         // console.log("data gitti");
  //         this.otel.push(item.data);
  //       }
  //     }
  //   );
  // }
}
