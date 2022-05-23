import { Room } from "../room";
import { Usuario } from "../usuario";

export interface Reservation{
    id : number;
    description : string;
    date : any;
    start : any;
    end : any;
    status : string;
    place : string;
    user : Usuario;
    room : Room;
}