import { Room } from "../room";
import { Usuario } from "../usuario";

export interface ReservationPayment{
    id : number;
    description : String;
    totalTime: number;
    place : String;
    status : String;
    totalAmount : number;
    discount : number;
    finalAmount : number;
    user : Usuario;
    room : Room;
}