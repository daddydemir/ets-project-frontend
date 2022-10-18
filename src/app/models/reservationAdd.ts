export interface ReservationAdd{
    customerId: number;
    hotelId: number;
    startDate: Date;
    endDate: Date;

    price?: number;
    id?:number;
}