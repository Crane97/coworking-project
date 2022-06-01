export interface PaymentIntentDto{
    token : string;
    description : String;
    amount : number;
    currency : String;
    payment_method : string;
}