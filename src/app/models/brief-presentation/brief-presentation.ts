import { Core } from "../cores/core";
import { BriefPresentationSlide } from "./brief-presentation-slide";

export class BriefPresentation extends Core{
    public slideshow:Array<BriefPresentationSlide> = new Array<BriefPresentationSlide>();
}
