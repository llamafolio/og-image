export type FileType = 'jpeg' | 'png';
export type Theme = 'light' | 'dark';

export interface ParsedRequest {
    balance: string;
    fileType: FileType;
    footerURL: string;
    images: string[];
    md: boolean;
    theme: Theme;
    title: string;
    volumeChange: string;
}
