import { Room } from "../room";
import { Usuario } from "../usuario";

export interface ReservationResponse{
    id : number;
    description : string;
    date : any;
    start : any;
    end : any;
    status : string;
    place : string;
    room : Room;
}