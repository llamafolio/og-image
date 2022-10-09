export type FileType = 'jpeg' | 'png';
export type Theme = 'light' | 'dark';

export interface ParsedRequest {
    balance: string;
    fileType: FileType;
    images: string[];
    md: boolean;
    theme: Theme;
    title: string;
    volumeChange: string;
}
