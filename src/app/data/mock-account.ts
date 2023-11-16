import { Account } from '../models/account/account';
import { PLANS } from './mock-plans';
import { Subscription } from '../models/account/subscription';
import { BillingInformation } from '../models/account/billing-information';
import { COUNTRIES, CITIES, LOCALITIES } from './mock-location';
import { BillingHistory } from '../models/account/billing-history';
import * as uuid from 'uuid/v4';
import * as moment from 'moment';
const $from = new Date(2018, 12, 8);

const $to = new Date(2018, 12, 8);

export const SUBSCRIPTIONS: Array<Subscription> = [
    <Subscription>{
        id: '1', recurly: 'annual',
        plan: PLANS[1], from: $from, to: $to
    }
];
export const ACCOUNT_BILLING: BillingInformation =
    <BillingInformation>{
        id: '1',
        businessName: 'Teamknology S.A',
        taxIdentification: 'ALMT54328901',
        addressStreet: 'Mexicali',
        addressNumber: '64',
        addressInsideNumber: '2B',
        country: COUNTRIES[1],
        city: CITIES[0],
        locality: LOCALITIES[0],
        zip: '06170',
        email: 'Javiera.mena@teamknowlogy.com',
        email2: 'Javiera@gmail.com'
    };
export const ACCOUNTS = [
    <Account>{ id: '1', status: 'active', subscription: SUBSCRIPTIONS[0],
     billingInformation: ACCOUNT_BILLING }
];

let today = new Date();
let countDate = 25;
const billingHistoryArray = [];
let billingHistory = new BillingHistory();
// Billing history
billingHistory.id = uuid();
billingHistory.date = today;
billingHistory.description = 'Servicio Brainy';
billingHistory.paymentMethod = 'Pendiente';
billingHistory.status = 'Pendiente';
billingHistory.total = 299;
billingHistoryArray.push(billingHistory);
while (countDate > 0) {
    today = moment(today).subtract(1, 'month').toDate();
    billingHistory = new BillingHistory();
    // Billing history
    billingHistory.id = uuid();
    billingHistory.description = 'Servicio Brainy';
    billingHistory.total = 299;
    billingHistory.date = today;
    billingHistory.status = 'Pagado';
    billingHistoryArray.push(billingHistory);
    countDate--;
}


export const BILLING_HISTORY: Array<BillingHistory> = billingHistoryArray;
