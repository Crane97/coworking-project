import { Room } from "../room";
import { Usuario } from "../usuario";

export interface ReservationPayment{
    id : number;
    description : String;
    totalTime: number;
    place : String;
    totalAmount : number;
    discount : number;
    amount : number;
    user : Usuario;
    room : Room;
}