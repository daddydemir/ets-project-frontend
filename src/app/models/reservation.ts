import { Hotel } from "./hotel";

export interface Reservation{
    id: number
    customerId: number;
    hotelId: number;
    startDate: Date;
    endDate: Date;
    price: number;

    hotel?: Hotel;
}