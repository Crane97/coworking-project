import { Company } from "./company";

export interface Usuario{
    id : number;
    name : string;
    surname : string;
    email : string;
    phone : string;
    partner : boolean;
    username : string;
    password : string;
    openToWork : boolean;
    jobTitle : string;
    customer : string;
    publicable : boolean;
    description : string;
    roles : Array<any>;
    reservation : Array<any>;
    company : Company;
}
