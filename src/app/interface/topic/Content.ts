import { TopicFile } from "../../models/meeting-note/topic-file";
import { Task } from "../../models/meeting-note/task";

export interface Content {
    text?: any;
    style?: any;
    video?: { url: string, shortUrl: string, sizes: any };
    link?: string;
    subTopic?: string;
    file?: TopicFile;
    gallery?: TopicFile[];
    task?: Task;

}