import { FileInformation } from '../files/file-information';
import { CommentThread } from '../comments/comment-thread';
import Setting from '../../interface/files/Setting';

export class Piece {

    // integracion
    public id: string;
    public name: string;
    public url: any;
    public order: number;
    public created: Date;
    public modified: Date;
    public type = 'image';
    public fileType: string;
    public edited = false;
    public latest = false;
    public parentId:any = '';
    public versionNumber = 0;
    public coreId: string;
    
     // setting
     public setting: Setting;

    // DTO
    public versions: Array<Piece> = new Array<Piece>();
    public commentThreads: Array<CommentThread> = new Array<CommentThread>();

    // front
    public fileInformation: FileInformation;
    public empty = true;
    public show = false;
    public previewUrl: any;
    public poster: string;
    public compared = false;
   
}
