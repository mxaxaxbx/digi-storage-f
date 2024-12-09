export interface NotificationI {
  id: string;
  type: string;
  color: string;
  title: string;
  message: string;
  closeIn: number;
  seconds: number;
}

export interface NotificationStateI {
  notifications: NotificationI[];
}

export const state: NotificationStateI = {
  notifications: [],
};
