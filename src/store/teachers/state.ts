import { UserI } from '@/store/auth/state';

export interface TeachersResultI {
  data: UserI[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface TeachersStateI {
  teachers: UserI[];
  teachersResult: TeachersResultI;
  teacher: UserI;
}

export const state: TeachersStateI = {
  teachers: [],
  teachersResult: {
    data: [],
    page: 0,
    perPage: 0,
    total: 0,
    totalPages: 0,
  },
  teacher: {
    id: 0,
    identificationNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    isActive: false,
    resetPassword: false,
    lang: '',
    twoFactors: false,
    username: '',
  },
};
