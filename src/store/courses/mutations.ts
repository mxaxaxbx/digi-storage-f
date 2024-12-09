import { MutationTree } from 'vuex';

import {
  CoursesStateI,
  CoursesResultI,
  CourseI,
} from './state';

export const mutations: MutationTree<CoursesStateI> = {
  setCoursesResult(state: CoursesStateI, payload: CoursesResultI) {
    state.coursesResult = payload;
  },
  setCourse(state: CoursesStateI, payload: CourseI) {
    state.course = payload;
  },
};
