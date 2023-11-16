import { Category } from "./category";
import { Core } from "../cores/core";
import { TypeTemplate } from "./type-template";


export class BriefTemplate extends Core {

  public id: any;
  public title: string;
  public category: Category;
  public img: string;
  public cover: string;
  public text: string = '';
  public isLibrary: boolean;
  public name: string;
  public systemTemplate = true;
  public typeTemplate: TypeTemplate;
  public withResponses = false;

  constructor() {
    super();
  };


}
