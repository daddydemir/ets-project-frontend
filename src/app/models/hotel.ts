import { Address } from "./address";

export interface Hotel{
    id?: number;
    addressId?: number;
    name?: string;
    phone?: string;
    image?: string;
    starSize?: number;
    information?:string;

    address?:Address;
}