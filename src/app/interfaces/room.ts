export interface Room{
    id : number;
    name : string;
    capacity : number;
    roomType : string;
    coverImage : string;
    images : string[];
    reservation : Array<any>;
}
