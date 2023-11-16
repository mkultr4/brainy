import { Billing } from "../models/billing/billing";
import { PaymentLog } from "../models/paymentLog/payment-log";
import { PLANS } from "./mock-plans";
import { PaymentMethod } from "../models/paymentLog/paymentMethod";
import { Reason } from "../models/billing/reason";


export const BILLING = [

    <Billing>{
        id: '1',
        outstanding: 299,
        billingDate: new Date('2018-09-28'),
        numberCard: '9864',
        nextPay: new Date('2019-10-28')
    }
];

export const PAYLOG: Array<PaymentLog> = [

    <PaymentLog>{
        id: '1',
        description:'Servicio Brainy',
        paymentDate: new Date('2018-10-10'),
        paidAmount: 299,
        expectedAmount: 299,
        plan: PLANS[0],
        account:{
            id:'1',
            status:'active',
            nextPayment: new Date('2018-10-28'),
            paymentAmount: 299,
            outstandingBalance:299
        },
        status:{
            id:'1',
            name:'Pagado'
        },
        payment:{
            id:'1',
            name:'BBVA BANCOMER',
            creditCardNumber: '9878',
            cardType:{
                id:'1',
                name:'Master Card',
                logo:'master.jpg'
            },
            account:{
                id:'1',
                status:'active',
                nextPayment: new Date('2018-10-28'),
                paymentAmount: 299,
                outstandingBalance:299
            }
        }
    },
    <PaymentLog>{
        id: '2',
        description:'Servicio Brainy',
        paymentDate: new Date('2018-11-11'),
        paidAmount: 299,
        expectedAmount: 299,
        plan: PLANS[0],
        account:{
            id:'1',
            status:'active',
            nextPayment: new Date('2018-12-11'),
            paymentAmount: 299,
            outstandingBalance:299
        },
        status:{
            id:'1',
            name:'Pendiente'
        },
        payment:{
            id:'1',
            name:'HSBC',
            creditCardNumber: '2894',
            cardType:{
                id:'1',
                name:'Master Card',
                logo:'master.jpg'
            },
            account:{
                id:'1',
                status:'active',
                nextPayment: new Date('2018-12-11'),
                paymentAmount: 299,
                outstandingBalance:299
            }
        }
    },
    <PaymentLog>{
        id: '3',
        description:'Servicio Brainy',
        paymentDate: new Date('2018-12-12'),
        paidAmount: 299,
        expectedAmount: 299,
        plan: PLANS[0],
        account:{
            id:'1',
            status:'active',
            nextPayment: new Date('2019-01-12'),
            paymentAmount: 299,
            outstandingBalance:299
        },
        status:{
            id:'2',
            name:'Pagado'
        },
        payment:{
            id:'1',
            name:'Banxico',
            creditCardNumber: '1095',
            cardType:{
                id:'1',
                name:'Master Card',
                logo:'master.jpg'
            },
            account:{
                id:'1',
                status:'active',
                nextPayment: new Date('2019-01-12'),
                paymentAmount: 299,
                outstandingBalance:299
            }
        }
    },
    <PaymentLog>{
        id: '4',
        description:'Servicio Brainy',
        paymentDate: new Date('2019-01-13'),
        paidAmount: 299,
        expectedAmount: 299,
        plan: PLANS[0],
        account:{
            id:'1',
            status:'active',
            nextPayment: new Date('2019-02-13'),
            paymentAmount: 299,
            outstandingBalance:299
        },
        status:{
            id:'2',
            name:'Pagado'
        },
        payment:{
            id:'1',
            name:'Santander',
            creditCardNumber: '9568',
            cardType:{
                id:'1',
                name:'Master Card',
                logo:'master.jpg'
            },
            account:{
                id:'1',
                status:'active',
                nextPayment: new Date('2019-02-13'),
                paymentAmount: 299,
                outstandingBalance:299
            }
        }
    },
    <PaymentLog>{
        id: '5',
        description:'Servicio Brainy',
        paymentDate: new Date('2019-01-13'),
        paidAmount: 299,
        expectedAmount: 299,
        plan: PLANS[0],
        account:{
            id:'1',
            status:'active',
            nextPayment: new Date('2019-03-14'),
            paymentAmount: 299,
            outstandingBalance:299
        },
        status:{
            id:'2',
            name:'Pagado'
        },
        payment:{
            id:'1',
            name:'Santander',
            creditCardNumber: '9568',
            cardType:{
                id:'1',
                name:'Master Card',
                logo:'master.jpg'
            },
            account:{
                id:'1',
                status:'active',
                nextPayment: new Date('2019-02-13'),
                paymentAmount: 299,
                outstandingBalance:299
            }
        }
    },
    <PaymentLog>{
        id: '6',
        description:'Servicio Brainy',
        paymentDate: new Date('2019-01-13'),
        paidAmount: 299,
        expectedAmount: 299,
        plan: PLANS[0],
        account:{
            id:'1',
            status:'active',
            nextPayment: new Date('2019-03-14'),
            paymentAmount: 299,
            outstandingBalance:299
        },
        status:{
            id:'2',
            name:'Pagado'
        },
        payment:{
            id:'1',
            name:'Santander',
            creditCardNumber: '9568',
            cardType:{
                id:'1',
                name:'Master Card',
                logo:'master.jpg'
            },
            account:{
                id:'1',
                status:'active',
                nextPayment: new Date('2019-02-13'),
                paymentAmount: 299,
                outstandingBalance:299
            }
        }
    }

];
export const PAYMENTMETHOD: Array<PaymentMethod> =[
    <PaymentMethod>{
        id:'1',
        name:'BBVA Bancomer',
        creditCardNumber: '9878',
        expiration: '28/19',
        cardType:{
            id:'1',
            name:'Master Card',
            logo:'master.jpg'
        },
        account:{
            id:'1',
            status:'active',
            nextPayment: new Date('2018-10-28'),
            paymentAmount: 299,
            outstandingBalance:299
        }

    }  
];

export const REASON: Array<Reason>=[
    <Reason>{
        id:'1',
        name:'Ya no necesito el servicio',
        description: 'Ya no necesito el servicio',
        action:''
    },
    <Reason>{
        id:'2',
        name:'Encontre otro provedor',
        description: 'Encontre otro provedor',
        action:''
    },
    <Reason>{
        id:'3',
        name:'Problemas técnicos',
        description: 'Problemas técnicos',
        action:''
    },
    <Reason>{
        id:'4',
        name:'Difícil de usar',
        description: 'Difícil de usar',
        action:''
    },
    <Reason>{
        id:'5',
        name:'Costo elevado',
        description: 'Costo elevado',
        action:''
    },
    <Reason>{
        id:'6',
        name:'Otros',
        description: 'Otros',
        action:''
    }
];
