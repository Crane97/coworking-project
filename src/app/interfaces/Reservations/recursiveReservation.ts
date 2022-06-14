import { Room } from "../room";
import { Usuario } from "../usuario";

export interface RecursiveReservation{
    description : string;
    entryDate : any;
    finalDate : any;
    monday : string;
    tuesday : string;
    wednesday : string;
    thursday : string;
    friday : string;
    start : any;
    end : any;
    status : string;
    place : string;
    user : Usuario;
    room : Room;
}