import { Reservation } from "./Reservations/reservation";

export interface Invoice{
    id: number;
    number : number;
    status : String;
    totalAmount : number;
    currency : String;
    issued : any;
    reservations : Reservation[];
}