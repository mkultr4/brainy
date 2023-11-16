import { ProposalFile } from "./proposal-file";
import { WorkspaceAccess } from "../workspace/workspace-access";
import { ProposalMessage } from "./proposal-message";

export class Proposal {
    id: any;
    status: string = 'pre-finalist';
    message: string;
    files: ProposalFile[] = [];
    proposalMessages:ProposalMessage[] = [];
    created:Date;
    modified:Date;
    createdBy: WorkspaceAccess;

}
