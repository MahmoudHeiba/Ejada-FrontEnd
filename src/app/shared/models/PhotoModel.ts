export interface IPhoto {
    id: number;
    photoUrl: string;
    desc: string;
    photoAlt: string;
    isActive: boolean;
    file?: File;
}