import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReservationDto } from '../models/reservationDto';
import { ListResponseModel } from '../models/listResponseModel';
import { Reservation } from '../models/reservation';
import { Hotel } from '../models/hotel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

    url = "http://localhost:8080/api/hotels/";
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
}
