export type FileType = 'png' | 'jpeg';
export type Theme = 'light' | 'dark';

export interface ParsedRequest {
    theme: Theme;
    fileType: FileType;
    title: string;
    balance: string;
    volumeChange: string;
    md: boolean;
    images: string[];
}
