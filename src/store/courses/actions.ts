import { ActionTree, ActionContext } from 'vuex';

import { eduClient } from '@/http-client';
import { camelToSnake, snakeToCamel } from '@/utils';

import { RootStateI, PaginationI } from '../state';
import { CourseI, CoursesStateI } from './state';

export const actions: ActionTree<CoursesStateI, RootStateI> = {
  async filter(
    context: ActionContext<CoursesStateI, RootStateI>,
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
          params.append('title', value);
          params.append('description', value);
          // remove the query key
          params.delete('query');
        }
      });
    }
    const { data } = await eduClient.get(`/api/courses/filter?${params.toString()}`);
    context.commit('setCoursesResult', snakeToCamel(data));
    return data;
  },
  async add(
    context: ActionContext<CoursesStateI, RootStateI>,
    payload: CourseI,
  ): Promise<void> {
    const { data } = await eduClient.post('/api/courses/add', camelToSnake(payload));
    return data;
  },
  async get(
    context: ActionContext<CoursesStateI, RootStateI>,
    payload: number,
  ): Promise<void> {
    const { data } = await eduClient.get(`/api/courses/get/${payload}`);
    context.commit('setCourse', snakeToCamel(data));
    return data;
  },
};
