import { Brand } from '../brands/brand';
import { Core } from '../cores/core';

export class Project {
    public id: any;
    public name: string;
    public type: string;
    public brand: Brand;
    public created: Date;
    public cores: Core[] = [];
    public coresCount = 0;
    public workspaceAccesses = [];
}
