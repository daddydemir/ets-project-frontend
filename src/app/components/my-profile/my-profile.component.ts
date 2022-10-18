import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  session(){
    window.location.href = "authentication-history";
  }

  reservation(){
    window.location.href = "my-reservations";
  }

  ticket(){
    window.location.href = "my-tickets";
  }
}
