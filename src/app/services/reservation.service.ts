import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReservationDto } from '../models/reservationDto';
import { ListResponseModel } from '../models/listResponseModel';
import { Reservation } from '../models/reservation';
import { Hotel } from '../models/hotel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ReservationAdd } from '../models/reservationAdd';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

    url = "http://localhost:8080/api/hotels/";
    add = "http://localhost:8080/api/reservation";

  constructor(private httpClient: HttpClient) { }


  search = async (dto: ReservationDto) => {

    return await this.httpClient.post<ListResponseModel<Hotel>>(
        this.url+'search',
        dto,
    ).toPromise();
  }

  getOtelsId= async(id: number) => {

    return this.httpClient.get<SingleResponseModel<Hotel>>(
      this.url+id
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
}
