import { BriefPresentationElement } from "./brief-presentation-element";

export class BriefPresentationSlide {
    public id:string;
    public order:number;
    public briefPresentationId:string;
    public show:boolean = false;
    public elements:Array<BriefPresentationElement> = new Array<BriefPresentationElement>();

}
