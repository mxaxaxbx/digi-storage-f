import { MutationTree } from 'vuex';

import {
  FilesStateI,
  FilesResultI,
} from './state';

export const mutations: MutationTree<FilesStateI> = {
  setResult(state: FilesStateI, payload: FilesResultI) {
    console.log('mutation setResult', payload);
    state.result = payload;
  },
};
