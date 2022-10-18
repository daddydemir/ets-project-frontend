import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReservationDto } from '../models/reservationDto';
import { ListResponseModel } from '../models/listResponseModel';
import { Reservation } from '../models/reservation';
import { Hotel } from '../models/hotel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ReservationAdd } from '../models/reservationAdd';
import { ResponseModel } from '../models/responseModel';
import { Address } from '../models/address';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  url = "http://localhost:8080/api/hotels/";
  add = "http://localhost:8080/api/reservation";
  getCustomer = "http://localhost:8080/api/reservations/customer/";

  constructor(private httpClient: HttpClient) { }


  search = async (dto: ReservationDto) => {

    return await this.httpClient.post<ListResponseModel<Hotel>>(
      this.url + 'search',
      dto,
    ).toPromise();
  }

  getOtelsId = async (id: number) => {

    return this.httpClient.get<SingleResponseModel<Hotel>>(
      this.url + id
    ).toPromise();
  }

  addReservation = async (reservation: ReservationAdd) => {

    const token: string = localStorage.getItem('token') || "";

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };

    return this.httpClient.post<ResponseModel>(
      this.add,
      reservation,
      httpOptions
    ).toPromise();
  }

  getAllForCustomer(id: string) {
    const token: string = localStorage.getItem('token') || "";

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };

    return this.httpClient.get<ListResponseModel<ReservationAdd>>(
      this.getCustomer + id,
      httpOptions
    ).toPromise();
  }
  getAddressById(id: number) {

    return this.httpClient.get<SingleResponseModel<Address>>("http://localhost:8080/api/address/" + id).toPromise();
  }

  deleteReservaion(id: number) {

    const token: string = localStorage.getItem('token') || "";

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };

    return this.httpClient.delete<ResponseModel>("http://localhost:8080/api/reservations/" + id,httpOptions).toPromise();
  }
}
