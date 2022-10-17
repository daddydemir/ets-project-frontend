import { Address } from "./address";
import { Room } from "./room";

export interface Hotel{
    id?: number;
    addressId?: number;
    name?: string;
    phone?: string;
    image?: string;
    starSize?: number;
    information?:string;

    address?:Address;
    room?: Room[];
    oda?: Room;
}