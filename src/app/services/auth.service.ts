import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginDto } from './../models/login';
import { Observable } from 'rxjs';
import { RegisterDto } from '../models/register';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';
import { History } from '../models/history';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl = "http://localhost:8080/api/auth/login";
  registerUrl = "http://localhost:8080/api/auth/register";
  image = "http://localhost:8080/api/customers/image/";
  constructor(private httpClient: HttpClient) { }

  register(registerDto: RegisterDto):Observable<any> {

    return this.httpClient.post(
      this.registerUrl,
      registerDto
    );
  }

  login(loginDto: LoginDto):Observable<any> {

    return this.httpClient.post(
      this.loginUrl,
      loginDto
    );
  }

  isAuthenticated(){
    if(localStorage.getItem('token')){
      return true;
    }else{
      return false;
    }
  }

  getCustomerById(id: string){

    return this.httpClient.get<SingleResponseModel<Customer>>("http://localhost:8080/api/customers/"+id).toPromise();
  }

  loginHistory(id:string){

    const token: string = localStorage.getItem('token') || "";

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };

    return this.httpClient.get<ListResponseModel<History>>(
      "http://localhost:8080/api/authentications/"+id,
      httpOptions
    ).toPromise();
  }

  imageUpdate(id:number, img:any){

    const token: string = localStorage.getItem('token') || "";

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    };

    return this.httpClient.post<ResponseModel>(
      this.image+id,
      img,
      httpOptions
    ).toPromise();
  }

}
