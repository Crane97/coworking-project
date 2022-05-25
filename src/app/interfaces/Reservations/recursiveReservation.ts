import { Room } from "../room";
import { Usuario } from "../usuario";

export interface RecursiveReservation{
    description : string;
    entryDate : any;
    finalDate : any;
    weekday : string;
    start : any;
    end : any;
    status : string;
    place : string;
    user : Usuario;
    room : Room;
}