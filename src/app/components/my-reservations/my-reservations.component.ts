import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/models/address';
import { Hotel } from 'src/app/models/hotel';
import { ReservationAdd } from 'src/app/models/reservationAdd';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.css']
})
export class MyReservationsComponent implements OnInit {

  id: string = '';
  liste: ReservationAdd[] = [];
  otel: Hotel = {};
  address: Address = {};

  constructor(
    private service: ReservationService
  ) { }

  ngOnInit(): void {
    this.id = localStorage.getItem('customerId') || '';
    this.init();
    
  }

  init =  async () => {

    await this.service.getAllForCustomer(this.id).then(
      item => {
        if(item?.success){
          this.liste = item.data;
        }
      }
    );

    await this.service.getOtelsId(this.liste[0].hotelId).then(
      item => {
        if(item?.success){
          this.otel = item.data;
        }
      }
    );

    await this.service.getAddressById(this.otel.addressId || 1).then(
      item => {
        if(item?.success){
          this.address = item.data;
        }
      }
    );
  }

  getAll = async () => {

    await this.service.getOtelsId(this.liste[0].hotelId).then(
      item => {
        if(item?.success){
          this.otel = item.data;
        }
      }
    );
  }

  delete =  async(id:number) => {

    var r = confirm("Rezervasyonu iptal etmek istediğinizden emin misiniz?");

    if(r == true){
      await this.service.deleteReservaion(id).then(
        item => {
          if(item?.success){
            alert(item.message);
          }
        }
      );
      window.location.reload();
    }

    
  }
}
