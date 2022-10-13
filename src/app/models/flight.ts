import { Plane } from "./plane";

export interface Flight{

    id?: number;
    planeId?: number;
    expeditionNo?: string;
    departurePoint?: string;
    destination?: string;
    priceBusiness?: number;
    priceEconomy?: number;
    departureTime?: Date;
    plane?: Plane;
}