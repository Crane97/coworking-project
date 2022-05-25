import { Room } from "../room";
import { Usuario } from "../usuario";

export interface DayReservation{
    description : string;
    entryDate : any;
    finalDate : any;
    start : any;
    end : any;
    status : string;
    place : string;
    user : Usuario;
    room : Room;
}