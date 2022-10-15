import { People } from "./people";

export interface Ticket{
    id?: number;
    customerId?: number;
    flightId?:number;
    seat?:string,
    person?: People;
    personId?:number;
    seatId?:number;
}