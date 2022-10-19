import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isAuth: boolean = false;
  customer: Customer = {};

  constructor(
    private service: AuthService,
  ) { }

  ngOnInit(): void {
    this.getir();
  }

  getir = async() => {
    let id: string = localStorage.getItem('customerId') || "0";

    await this.service.getCustomerById(id).then(
      item => {
        if(item?.success){
          this.customer = item.data;
          this.isAuth = true;
        }
      },
      err => {
        //  nothing
      }
    );
  }

  logout () {
    localStorage.clear();
    this.isAuth = false;
  }

}
