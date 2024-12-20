import { ActionTree, ActionContext } from 'vuex';

import { storageClient } from '@/http-client';
import { camelToSnake, snakeToCamel } from '@/utils';

import { RootStateI, PaginationI } from '../state';
import { FilesStateI } from './state';

export const actions: ActionTree<FilesStateI, RootStateI> = {
  async filter(
    context: ActionContext<FilesStateI, RootStateI>,
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
          params.append('name', value);
        }
      });
    }
    const { data } = await storageClient.get(`/api/storage/listfiles?${params.toString()}`);
    context.commit('setResult', snakeToCamel(data));
  },
  async upload(
    context: ActionContext<FilesStateI, RootStateI>,
    payload: FormData,
  ): Promise<void> {
    await storageClient.post(
      '/api/storage/upload',
      payload,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    context.dispatch('filter', null);
  },
};
