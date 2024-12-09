import { ActionTree, ActionContext } from 'vuex';

import { eduClient } from '@/http-client';
import { camelToSnake, snakeToCamel } from '@/utils';

import { RootStateI, PaginationI } from '../state';
import { TeachersStateI } from './state';
import { UserI } from '../auth/state';

export const actions: ActionTree<TeachersStateI, RootStateI> = {
  async filter(
    context: ActionContext<TeachersStateI, RootStateI>,
    payload: PaginationI | null,
  ): Promise<void> {
    // convert the payload to url query params
    const params = new URLSearchParams();
    if (payload) {
      Object.entries(payload).forEach(([key, value]) => {
        if (value) {
          params.append(key, value);
        }
        if (key === 'query') {
          params.append('identification', value);
          params.append('first_name', value);
          params.append('last_name', value);
          params.append('email', value);
          // remove the query key
          params.delete('query');
        }
      });
    }
    const { data } = await eduClient.get(`/api/teachers/filter?${params.toString()}`);
    context.commit('setTeachersResult', snakeToCamel(data));
    return data;
  },
  async add(
    context: ActionContext<TeachersStateI, RootStateI>,
    payload: UserI,
  ): Promise<void> {
    const { data } = await eduClient.post('/api/teachers/add', payload);
    return data;
  },
  async getbyid(
    context: ActionContext<TeachersStateI, RootStateI>,
    payload: number,
  ): Promise<void> {
    const { data } = await eduClient.get(`/api/teachers/get/${payload}`);
    context.commit('setTeacher', snakeToCamel(data));
    return data;
  },
  async update(
    context: ActionContext<TeachersStateI, RootStateI>,
    payload: UserI,
  ): Promise<void> {
    const { data } = await eduClient.patch('/api/teachers/update', camelToSnake(payload));
    return data;
  },
};
