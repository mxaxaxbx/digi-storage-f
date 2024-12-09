import { MutationTree } from 'vuex';

import { RootStateI } from './state';

const mutations: MutationTree<RootStateI> = {
  toggleSidebar(state) {
    state.sidebar = !state.sidebar;
  },
  closeSidebar(state) {
    state.sidebar = false;
  },
};

export {
  mutations,
};
