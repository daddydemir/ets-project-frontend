import { People } from "./people";

export interface Ticket{
    customerId?: number;
    flightId?:number;
    seat?:string,
    person?: People;
}