export enum NOTIFICATION_TYPE {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

export interface NotificationType {
  id: number;
  message: string;
  type: NOTIFICATION_TYPE;
}
