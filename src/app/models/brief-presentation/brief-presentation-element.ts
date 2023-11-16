import  Content  from "src/app/interface/brief-template/Content";

export class BriefPresentationElement {
    public id: string;
    public briefPresentationSlideId: string;
    public type: string = 'text';
    public left: number;
    public top: number;
    public width: number;
    public height: number;
    public styleFontSize: number = 36;
    public styleBackground: string = '';
    public styleColor: string = '';
    public letterSpacing: number = 0.5;

    public content: Content;

}
