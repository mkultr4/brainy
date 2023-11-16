import { Project } from '../models/projects/project';
import { BRANDS } from './mock-brands';
const userActivityTimestamp = new Date(new Date().setHours(10, 45, 0, 0));

export const PROJECTS: Project[] = [
    Object.assign(new Project,
        <Project>{ id: '1', brand: BRANDS[0], name: 'Proyecto apple', created: userActivityTimestamp }),
    Object.assign(new Project,
        <Project>{ id: '2', brand: BRANDS[1], name: 'Proyecto banamex', created: userActivityTimestamp }),
    Object.assign(new Project(),
        <Project>{ id: '3', brand: BRANDS[2], name: 'Proyecto Marca 4', created: userActivityTimestamp }),
    Object.assign(new Project(),
        <Project>{ id: '4', brand: BRANDS[3], name: 'Proyecto domino’s', created: userActivityTimestamp }),
    Object.assign(new Project(),
        <Project>{ id: '5', brand: BRANDS[4], name: 'Proyecto mercedes benz', created: userActivityTimestamp }),
    Object.assign(new Project(),
        <Project>{ id: '6', brand: BRANDS[5], name: 'Proyecto nestlé', created: userActivityTimestamp }),
    Object.assign(new Project(),
        <Project>{ id: '7', brand: BRANDS[6], name: 'Proyecto panasonic', created: userActivityTimestamp }),
    Object.assign(new Project(),
        <Project>{ id: '8', brand: BRANDS[7], name: 'Proyecto pepsi', created: userActivityTimestamp }),
    Object.assign(new Project(),
        <Project>{ id: '9', brand: BRANDS[8], name: 'Proyecto samsung', created: userActivityTimestamp }),
    Object.assign(new Project(),
        <Project>{ id: '10', brand: BRANDS[9], name: 'Proyecto Marca 1', created: userActivityTimestamp }),
    Object.assign(new Project(),
        <Project>{ id: '11', brand: BRANDS[10], name: 'Proyecto Marca L', created: userActivityTimestamp }),
    Object.assign(new Project(),
        <Project>{ id: '12', brand: BRANDS[11], name: 'Proyecto Algo', created: userActivityTimestamp }),
    Object.assign(new Project(),
        <Project>{ id: '13', brand: BRANDS[0], name: 'Proyecto Otro', created: userActivityTimestamp }),
    Object.assign(new Project(),
        <Project>{ id: '14', brand: BRANDS[12], name: 'Proyecto Marca 5', created: userActivityTimestamp }),
    Object.assign(new Project(),
        <Project>{ id: '15', brand: BRANDS[0], name: 'Proyecto Marca X', created: userActivityTimestamp }),
    Object.assign(new Project(),
        <Project>{ id: '16', brand: BRANDS[2], name: 'Proyecto Marca Z', created: userActivityTimestamp }),
    Object.assign(new Project(),
        <Project>{ id: '17', brand: BRANDS[8], name: 'Proyecto Marca 8', created: userActivityTimestamp }),
    Object.assign(new Project(),
        <Project>{ id: '18', brand: BRANDS[8], name: 'Proyecto Marca 9', created: userActivityTimestamp }),
    Object.assign(new Project(),
        <Project>{ id: '19', brand: BRANDS[12], name: 'Proyecto Zara', created: userActivityTimestamp }),
    Object.assign(new Project(),
        <Project>{ id: '20', brand: BRANDS[4], name: 'Proyecto Citi 2', created: userActivityTimestamp })
];
