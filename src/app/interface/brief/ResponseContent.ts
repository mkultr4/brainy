import { Option } from "src/app/models/brief/option";
import { CategoryItemFile } from "src/app/models/brief/category-item-file";

export default interface ResponseContent {
    text?: string;
    quantity?: any;
    options?: Option[];
    files?: {
        video: { url?: string, shortUrl?: string },
        image: CategoryItemFile,
        file: CategoryItemFile,
        audio: { src?: any, duration?: any }, 
        link: string
    };
}
