export interface IVideo {
    id: number;
    videoUrl: string;
    desc: string;
    videoAlt: string;
    file?: File;
    isActive: boolean;
}