import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FlightDto } from '../models/flightDto';
import { Flight } from '../models/flight';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class PlaneTicketService {

    listForSearch = "http://localhost:8080/api/flights/search";

  constructor(private httpClient: HttpClient) { }

  search(flightDto: FlightDto): Observable<ListResponseModel<Flight>>{

    return this.httpClient.post<ListResponseModel<Flight>>(
      this.listForSearch,
      flightDto
    );
  }

  takeTicket(){}

  deleteTicket(){}

}
