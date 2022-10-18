import { Component, OnInit } from '@angular/core';
import { History } from 'src/app/models/history';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-session-history',
  templateUrl: './session-history.component.html',
  styleUrls: ['./session-history.component.css']
})
export class SessionHistoryComponent implements OnInit {

  liste: History[] = [];

  constructor(
    private service: AuthService
  ) { }

  ngOnInit(): void {

    // const h: History = {
    //   id: 0,
    //   dateOfImport: new Date(),
    //   token: 'tnk_is_this',
    //   customerId: 0
    // };
    // this.liste.push(h);

    this.getData();
  }

  getData =  async () => {
    const id: string = localStorage.getItem('customerId') || "";

    await this.service.loginHistory(id).then(
      item => {
        if(item?.success){
          this.liste = item.data;
        }
      }
    );
  }

}
