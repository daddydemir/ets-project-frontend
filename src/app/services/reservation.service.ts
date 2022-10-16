import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReservationDto } from '../models/reservationDto';
import { ListResponseModel } from '../models/listResponseModel';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

    url = "https://localhost:8080/api/reservations/";
  constructor(private httpClient: HttpClient) { }


  search = async (dto: ReservationDto) => {

    return await this.httpClient.get<ListResponseModel<Reservation>>(
        this.url+'search'
    ).toPromise();
  }
}
