import { Module } from 'vuex';

import { RootStateI } from '../state';
import { state, FilesStateI } from './state';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

const module: Module<FilesStateI, RootStateI> = {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};

export default module;
