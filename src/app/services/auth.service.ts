import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginDto } from './../models/login';
import { Observable } from 'rxjs';
import { RegisterDto } from '../models/register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl = "http://localhost:8080/api/auth/login";
  registerUrl = "http://localhost:8080/api/auth/register";

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

}
