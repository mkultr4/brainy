import { User } from '../users/user';
import { Workspace } from '../workspace/workspace';
import { Subscription } from './subscription';
import { BillingInformation } from './billing-information';

export class Account {
    public id: any;
    public status: string;
    public users: User[];
    public workspaces: Workspace[];
    public active: boolean;
    public subscription: Subscription;
    public billingInformation: BillingInformation;
    public nextPayment: Date;
    public paymentAmount: number;
    public outstandingBalance: number;


}
