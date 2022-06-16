import { Usuario } from "./usuario";

export interface Company{
    id : number;
    name : string;
    workers : string;
    field : string;
    logo : string;
    hiring : boolean;
    idAdmin : Usuario;
}