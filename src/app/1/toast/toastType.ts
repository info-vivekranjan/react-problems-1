export enum ToastType {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

export interface SingleToastType {
  id: number;
  message: string;
  type: string;
}
