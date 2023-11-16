import { BriefCategoryItem } from "./brief-category-item";
import { CommentThread } from "../comments/comment-thread";

export class BriefCategory {
    public id: any;
    public title: string = '';
    public order: number;
    public items: BriefCategoryItem[] = [];
    public saved = false;
    public isFilled = false;
    // Comments
    public commentThreads:CommentThread[] = [];

}
