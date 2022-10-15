import { Component, OnInit } from '@angular/core';
import { Flight } from 'src/app/models/flight';
import { MyTicket } from 'src/app/models/my-ticket';
import { People } from 'src/app/models/people';
import { Plane } from 'src/app/models/plane';
import { Ticket } from 'src/app/models/ticket';
import { PlaneTicketService } from 'src/app/services/planeTicket.service';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.css']
})
export class MyTicketsComponent implements OnInit {

  tickets: Ticket[] = [];

  planes: Plane[] = [];
  persons: People[] = [];
  flights: Flight[] = [];

  myTickets: MyTicket[] = [];

  constructor(
    private service: PlaneTicketService,
    ) { }

  ngOnInit(): void {
    
    this.getTickets();

  }

  getTickets = async () =>{
    let customerId: string = "";
    customerId = localStorage.getItem('customerId') || "";

    await this.service.getAllTicketsByCustomerId(customerId).then(
      item => {
        this.tickets = item?.data || [];
      }
    );

    await this.service.getFlights().then(
      item => {
        this.flights = item?.data || [];
      }
    );    

    await this.service.getPersons().then(
      item => {
        this.persons = item?.data || [];
      }
    );

    await this.service.getPlanes().then(
      item => {
        this.planes = item?.data || [];
      }
    );
    
    
    for(var i=0; i < this.tickets.length; i++){
      for(var k=0; k<this.persons.length; k++){
        // 
        if(this.persons[k].id == this.tickets[i].personId){
          // personId ve ticket'tan gelen personId ye göre eşleşme yapılıyor.
          
          let temp: MyTicket = {};
          temp.id = this.tickets[i].id;
          if(this.tickets[i].seatId == 1){
            temp.seat = "BUSINESS";
          }else{
            temp.seat = "ECONOMY";
          }
          temp.person = this.persons[k];
          temp.flightId = this.tickets[i].flightId;
          this.myTickets.push(temp);

          // kullanıcı ve bilet arasındaki eşleşme bitti...
        }
      }
    }
    for(var i=0; i<this.flights.length; i++){
      for(var k=0; k<this.planes.length; k++){
        if(this.flights[i].planeId == this.planes[k].id){
          this.flights[i].plane = this.planes[k];
          // uçak ve uçuş arasındaki yapı kuruldu...
        }
      }
    }

    for(var i=0; i<this.myTickets.length; i++){
      for(var k=0; k< this.flights.length; k++){
        if(this.flights[k].id == this.myTickets[i].flightId){
          this.myTickets[i].flight = this.flights[k];
          // ticket'a uçak ve uçuş aktarıldı...
        }
      }
    }
  }

}
