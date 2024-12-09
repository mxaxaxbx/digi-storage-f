import { ActionTree, ActionContext } from 'vuex';

import { usersClient } from '@/http-client';
import { snakeToCamel } from '@/utils';

import { RootStateI } from '../state';
import { NotificationStateI } from './state';

export const actions: ActionTree<NotificationStateI, RootStateI> = {
};
