// @mui
import { SxProps, Theme } from "@mui/material/styles";
import { ReactNode } from "react";
import { Accept, DropzoneOptions } from "react-dropzone";
import { Control } from "react-hook-form";
import { ColorSchema } from "theme/palette";

// ----------------------------------------------------------------------

export interface CustomFile extends File {
  path?: string;
  preview?: string;
  type: string;
  name: string;
}

export interface UploadProps extends DropzoneOptions {
  error?: boolean;
  file?: CustomFile | string | null;
  helperText?: ReactNode;
  sx?: SxProps<Theme>;
  accept?: Accept;
  color?: ColorSchema;
  labels?: {
    new: string;
    update: string;
  };
  setValue?;
  name;
  control?: Control<any, any>;
}

export type UploadMultiFileProps = DropzoneOptions & {
  error?: boolean;
  files?: (File | string)[];
  name: string;
  showPreview: boolean;
  onRemove?: (file: File | string | number) => void;
  onRemoveAll?: VoidFunction;
  sx?: SxProps<Theme>;
  helperText?: ReactNode;
  accept?: Accept;
  setValue;
  control?: Control<any, any>;
  multiple?: boolean;
  type?: string;
  label?: string;
};

export const acceptImages = {
  "image/*": ["jpg", "png", "gif"],
  "audio/*": ["mp3"],
  "video/*": [],
};

export const acceptFiles = {
  "file/*": [".pdf", ".docx", ".xlsx", ".pptx", ".txt", ".csv"],
};
