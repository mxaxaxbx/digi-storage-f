import { MutationTree } from 'vuex';

import { decode, encode } from '@/utils/custom-enc-dec';

import {
  AuthStateI,
  ProjectI,
  PermissionI,
  UserI,
} from './state';

function checkProject() {
  const projectEncoded = localStorage.getItem('project');
  if (!projectEncoded) {
    return '';
  }
  return projectEncoded;
}

export const mutations: MutationTree<AuthStateI> = {
  setProjects(state: AuthStateI, payload: string) {
    if (payload.length === 0) {
      localStorage.removeItem('projects');
      state.projects = [];
      return;
    }
    const { value } = decode(payload);
    localStorage.setItem('projects', payload);
    state.projects = value as unknown as ProjectI[];

    const project = checkProject();
    if (!project) {
      const selectedProject = state.projects[0] as any;
      selectedProject.ID = Number(selectedProject.ID);
      const projectEncoded = encode(selectedProject);
      localStorage.setItem('project', projectEncoded);
    }
  },
  setProject(state: AuthStateI, payload: ProjectI) {
    if (!payload) {
      localStorage.removeItem('project');
      state.project = undefined;
      return;
    }
    state.project = payload;
    const projectEncoded = encode(payload);
    localStorage.setItem('project', projectEncoded);
  },
  setPermissions(state: AuthStateI, payload: string) {
    if (payload.length === 0) {
      localStorage.removeItem('permissions');
      state.permissions = [];
      return;
    }
    const { value } = decode(payload);
    localStorage.setItem('permissions', payload);
    state.permissions = value as unknown as PermissionI[];
  },
  setToken(state: AuthStateI, payload: string) {
    if (!payload) {
      localStorage.removeItem('token');
      state.token = '';
      return;
    }
    const { value } = decode(payload);
    localStorage.setItem('token', payload);
    state.token = value as unknown as string;
  },
  setUser(state: AuthStateI, payload: string) {
    if (!payload) {
      localStorage.removeItem('user');
      state.user = undefined;
      return;
    }

    const { value } = decode(payload);
    localStorage.setItem('user', payload);
    state.user = value as unknown as UserI;
  },
};
