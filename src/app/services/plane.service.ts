import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FlightDto } from '../models/flightDto';
import { Flight } from '../models/flight';
import { ListResponseModel } from '../models/listResponseModel';
import { Plane } from '../models/plane';

@Injectable({
  providedIn: 'root'
})
export class PlaneService {

    url = "http://localhost:8080/api/planes";

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get<ListResponseModel<Plane>>(this.url).toPromise();
  }

}
