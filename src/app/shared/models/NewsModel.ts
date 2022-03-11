import { PhotoModule } from "src/app/admin/component/libraryPhoto/photo.module";
import { IPhoto } from "./PhotoModel";

export interface INews {
    id: number;
    title: string;
    subTitle: string;
    content: string;
    isActive: boolean;

    newsPhotos?: IPhoto[]
}