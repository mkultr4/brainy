import { Task } from "./task";
import { TopicLineItem } from "./topic-line-item";
import { CommentThread } from "../comments/comment-thread";

export class Topic {
    public id: any;
    public order: number;
    public title: string = '';
    // Description
    public description: string = '';
    public descriptionItems: Array<TopicLineItem> = [];
    // Agreement
    public agreement: string = '';
    public agreementItems: Array<TopicLineItem> = [];
    public saved: boolean = false;
    public tasks: Array<Task> = new Array<Task>();
    public pending: boolean = false;
    public commentThreads: Array<CommentThread> = new Array<CommentThread>();
    // public show: boolean = false;
}
