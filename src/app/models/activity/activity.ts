import { Brand } from '../brands/brand';
import { Project } from '../projects/project';
import { Core } from '../cores/core';

export class Activity {
    public id: any;
    public event: string;
    public description:string;
    public fechaReg:Date;
    //Brand
    public brand:Brand;
    //project
    public project:Project;
    //core
    public core:Core;
}
