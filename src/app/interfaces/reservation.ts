import { Room } from "./room";
import { Usuario } from "./usuario";

export interface Reservation{
    id : number;
    description : string;
    start : string;
    end : string;
    status : string;
    place : string;
    user : Usuario;
    room : Room;
}