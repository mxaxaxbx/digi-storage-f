import { MutationTree } from 'vuex';

import { UserI } from '@/store/auth/state';
import {
  TeachersStateI,
  TeachersResultI,
} from './state';

export const mutations: MutationTree<TeachersStateI> = {
  setTeachersResult(state: TeachersStateI, payload: TeachersResultI) {
    state.teachersResult = payload;
  },
  setTeacher(state: TeachersStateI, payload: UserI) {
    state.teacher = payload;
  },
};
