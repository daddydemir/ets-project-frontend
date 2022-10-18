import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginDto } from './../models/login';
import { map, mergeMap } from 'rxjs/operators';
import { RegisterDto } from '../models/register';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';
import { City } from '../models/cityModel';

@Injectable({
  providedIn: 'root'
})
export class ElasticService {
    

    url = "http://localhost:8080/api/elastic/"

  constructor(private httpClient: HttpClient) { }

  getCity = async (p: string) => {
    return this.httpClient.get<ListResponseModel<City>>(
        this.url+p
    ).toPromise();
  }
}
