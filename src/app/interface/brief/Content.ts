import { CategoryItemFile } from "src/app/models/brief/category-item-file";
import { DynamicContent } from "src/app/models/brief/dynamic-content";

export default interface Content {
    file?: CategoryItemFile;
    video?: { url: string, shortUrl: string, sizes: any };
    dynamicContent?:DynamicContent[];
}
