import { WorkspaceAccess } from "../workspace/workspace-access";
import { TopicLineItemReference } from "./topic-line-item-reference";

export class Task {
    id:any;
    // schedules - fill_now
    type = 'fill_now'
    reference = TopicLineItemReference.DESCRIPTION;
    order =  0;
    idTopic:any
    date: string = '';
    hour: string = '';
    timestamp: Date;
    description: string = '';
    responsible: WorkspaceAccess;
}
