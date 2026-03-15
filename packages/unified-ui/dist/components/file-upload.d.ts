import * as react from 'react';
import { ReactNode } from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';

declare const fileUploadZoneVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
    state?: "disabled" | "error" | "idle" | "dragOver" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type FileUploadSize = "sm" | "md" | "lg";
interface FileUploadItem {
    id: string;
    file: File;
    preview?: string;
    progress?: number;
    error?: string;
    status: "idle" | "uploading" | "success" | "error";
}
interface FileUploadProps {
    onFilesChange?: (files: FileUploadItem[]) => void;
    onFileAdd?: (file: File) => void;
    onFileRemove?: (id: string) => void;
    accept?: string;
    multiple?: boolean;
    maxFiles?: number;
    maxSize?: number;
    size?: FileUploadSize;
    disabled?: boolean;
    label?: ReactNode;
    description?: ReactNode;
    className?: string;
    "aria-label"?: string;
}
declare const FileUpload: react.ForwardRefExoticComponent<FileUploadProps & react.RefAttributes<HTMLDivElement>>;

export { FileUpload, type FileUploadItem, type FileUploadProps, type FileUploadSize, fileUploadZoneVariants };
