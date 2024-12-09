import { MutationTree } from 'vuex';
import moment from 'moment';

import { NotificationStateI, NotificationI } from './state';

const secondsByDefault = 5;
const typeByDefault = 'info';
const colorByType: { [key: string]: string } = {
  success: 'green',
  error: 'red',
  warning: 'yellow',
  info: 'blue',
};

export const mutations: MutationTree<NotificationStateI> = {
  addNotification(state, notification: NotificationI) {
    const seconds = notification.seconds || secondsByDefault;
    const nowPlusSecs = moment().add(seconds, 'seconds').format('X');

    const type = notification.type || typeByDefault;

    const color = colorByType[type];

    const notif = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      closeIn: Number(nowPlusSecs),
      color,
    };
    state.notifications.push(notif);
  },
  removeNotification(state, id) {
    state.notifications = state.notifications.filter((n) => n.id !== id);
  },
  clearNotifications(state) {
    state.notifications = [];
  },
};
