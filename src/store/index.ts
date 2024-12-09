import { createStore, Store } from 'vuex';

import auth from './auth';
import teachers from './teachers';
import notifications from './notifications';
import courses from './courses';

import { state, RootStateI } from './state';
import { mutations } from './mutations';

const store: Store<RootStateI> = createStore({
  state,
  getters: {
  },
  mutations,
  actions: {
  },
  modules: {
  },
});

store.registerModule('auth', auth);
store.registerModule('notifications', notifications);
store.registerModule('teachers', teachers);
store.registerModule('courses', courses);

export default store;
