import { Plan } from "../plan/plan";
import { PaymentStatus } from "./payment-status";
import { Account } from "../account/account";
import { PaymentMethod } from "./paymentMethod";


export class PaymentLog {
    public id: any;
    public description: string;
    public paymentDate: Date;
    public paidAmount:number;
    public expectedAmount:number;

    public plan: Plan;
    public account: Account;
    public status: PaymentStatus;
    public payment: PaymentMethod;

}
