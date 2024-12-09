export interface CourseI {
  id: number;
  teacherId: number;
  title: string;
  description: string;
}

export interface CoursesResultI {
  data: CourseI[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface CoursesStateI {
  courses: CourseI[];
  coursesResult: CoursesResultI
  course: CourseI;
}

export const state: CoursesStateI = {
  courses: [],
  coursesResult: {
    data: [],
    page: 1,
    perPage: 0,
    total: 0,
    totalPages: 0,
  },
  course: {
    id: 0,
    teacherId: 0,
    title: '',
    description: '',
  },
};
