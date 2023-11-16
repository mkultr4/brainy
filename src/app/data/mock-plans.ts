import { Plan } from '../models/plan/plan';


export const PLANS: Array<Plan> = [
    <Plan>{
        id: '1',
        order: 1,
        key: 'company',
        name: 'Plan Empresa',
        description: 'Ideal para clientes y agencias medianas.',
        priceAnnual: 480,
        priceMonthly: 40,
        users: 5,
        projects: 0,
        guests: 0,
        storage: 1
    },
    <Plan>{
        id: '2',
        order: 2,
        name: 'Plan Profesional',
        key: 'professional',
        description: 'Ideal para clientes y agencias medianas.',
        priceAnnual: 1188,
        priceMonthly: 99,
        users: 5,
        projects: 0,
        guests: 0,
        storage: 5
    },
    <Plan>{
        id: '3',
        order: 3,
        name: 'Plan Multi',
        key: 'multi',
        description: 'Ideal para clientes y agencias medianas.',
        priceAnnual: 3588,
        priceMonthly: 299,
        users: 5,
        projects: 0,
        guests: 0,
        storage: 10
    }
];
