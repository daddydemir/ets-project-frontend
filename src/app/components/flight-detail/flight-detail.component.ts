import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Flight } from 'src/app/models/flight';
import { People } from 'src/app/models/people';
import { Plane } from 'src/app/models/plane';
import { Ticket } from 'src/app/models/ticket';
import { PlaneTicketService } from 'src/app/services/planeTicket.service';

@Component({
  selector: 'app-flight-detail',
  templateUrl: './flight-detail.component.html',
  styleUrls: ['./flight-detail.component.css']
})
export class FlightDetailComponent implements OnInit {

  id?: string;
  ucus?: Flight;
  personFrom!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private service: PlaneTicketService,
  ) { }

  ngOnInit(): void {

    let f: Flight = {};
    let p: Plane = {};

    this.activatedRoute.params.subscribe((params => {
      this.id = params['id'];
      // id'yi aldık.
    }));
    this.createFrom();
    this.mtd();
  }

  mtd = async () => {

    await this.service.getFlightById(this.id!).then(
      response => {
        if (response?.success) {
          // veri geldi.
          this.ucus = response.data;
          // f = response.data;
        } else {
          alert("uçuş bulunamadı.");
        }
      }
    );

    let pid: string | null = "";
    pid = this.ucus?.planeId + "";

    await this.service.getPlaneById(pid).then(
      response => {
        if (this.ucus != null) {
          this.ucus.plane = response?.data;
        }
      }
    )
  }

  createFrom() {
    this.personFrom = this.formBuilder.group({
      "name": ['', [Validators.required]],
      "surname": ['', [Validators.required]],
      "identity": ['', [Validators.required]],
      "email": ['', [Validators.required]],
      "gender": ['', [Validators.required]],
      "seat": ['', [Validators.required]],
    });
  }

  buy = async () => {

    const p: People = {};

    let data = this.personFrom.value;
    p.email = data.email;
    p.name = data.name;
    p.surname = data.surname;
    p.identityNo = data.identity;
    p.gender = data.gender;

    let ticket: Ticket = {};

    ticket.person = p;
    ticket.flightId = this.ucus?.id;
    ticket.customerId = Number(localStorage.getItem("customerId"));
    ticket.seat = data.seat;

    await this.service.takeTicket(ticket).then(
      response => {
        if (response?.success) {

        }
        else {
          alert(response?.message);
        }
        console.log(response?.message);
        window.location.href = "/my-tickets";
      },
      error => {
        console.log(error.error);
        alert(error.error.message);
        window.location.href = "/login";
      }
    );
  }



}
