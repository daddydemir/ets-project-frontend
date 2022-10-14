import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FlightDto } from '../models/flightDto';
import { Flight } from '../models/flight';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { People } from '../models/people';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Plane } from '../models/plane';

@Injectable({
  providedIn: 'root'
})
export class PlaneTicketService {

    listForSearch = "http://localhost:8080/api/flights/search";
    take = "http://localhost:8080/api/ticket";
    flightId = "http://localhost:8080/api/flights/";
    planeId = "http://localhost:8080/api/planes/";

  constructor(private httpClient: HttpClient) { }

  search(flightDto: FlightDto): Observable<ListResponseModel<Flight>>{

    return this.httpClient.post<ListResponseModel<Flight>>(
      this.listForSearch,
      flightDto
    );
  }

  getFlightById(id:string){

    return this.httpClient.get<SingleResponseModel<Flight>>(this.flightId+id).toPromise();
  }

  getPlaneById(id: string){
    return this.httpClient.get<SingleResponseModel<Plane>>(this.planeId+id).toPromise();
  }

  takeTicket(people: People){

    const token: string = localStorage.getItem('token') || "";

    alert(token);

    // const httpOptions : Object = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer ' + token
    //   }),
    //   responseType: 'text'
    // };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer '+token
      })
    };

    const h = new HttpHeaders().set("","");

    return this.httpClient.post<ResponseModel>(
      this.take,
      people,
      httpOptions
      
    ).toPromise();
  }

  deleteTicket(){}

}
