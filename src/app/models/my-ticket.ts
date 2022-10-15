import { Flight } from "./flight";
import { People } from "./people";

export interface MyTicket{
    id?: number;
    seat?: string;
    flightId?:number;
    flight?: Flight;
    person?: People;

}