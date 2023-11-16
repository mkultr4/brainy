
import { Plan } from "../plan/plan";
import { PaymentStatus } from "./payment-status";
import { Account } from "../account/account";
import { CardType } from "./card-type";


export class PaymentMethod {
    public id: any;
    public name: string;
    public creditCardNumber: string;
    public cardType: CardType;
    public account: Account;
    public expiration:string;
    public secureCode: string;

}