import { Plan } from '../plan/plan';

export class Subscription {
    id: any;
    recurly: string;
    plan: Plan;
    from: Date;
    to: Date;
}
