import { ActionTree, ActionContext } from 'vuex';

import { usersClient } from '@/http-client';

import { RootStateI } from '../state';
import { AuthStateI, ProjectI } from './state';

export const actions: ActionTree<AuthStateI, RootStateI> = {
  async confirmSession(context: ActionContext<AuthStateI, RootStateI>, payload: string) {
    if (!payload) {
      const { VUE_APP_DIGI_USERS_F } = process.env;
      window.location.href = `${VUE_APP_DIGI_USERS_F}/auth/login?app=storage`;
      return;
    }
    context.commit('setToken', payload);
    await context.dispatch('getUserDetails');
    await context.dispatch('getUserPermissions');
    await context.dispatch('getUserProjects');
    window.location.href = '/app';
  },
  async getUserDetails(context: ActionContext<AuthStateI, RootStateI>) {
    const { data } = await usersClient.get('/api/auth/userdetailsv2');
    context.commit('setUser', data);
  },
  async getUserPermissions(context: ActionContext<AuthStateI, RootStateI>) {
    const { data } = await usersClient.get('/api/auth/userperms');
    context.commit('setPermissions', data);
  },
  async getUserProjects(context: ActionContext<AuthStateI, RootStateI>) {
    const { data } = await usersClient.get('/api/auth/userbusinesses');
    context.commit('setProjects', data);
  },
  logout(context: ActionContext<AuthStateI, RootStateI>) {
    context.commit('setToken', '');
    context.commit('setUser', '');
    context.commit('setPermissions', '');
    context.commit('setProjects', '');
    context.commit('setProject', null);
    const { VUE_APP_DIGI_USERS_F } = process.env;
    window.location.href = `${VUE_APP_DIGI_USERS_F}/auth/login?app=storage`;
  },
  changeProject(context: ActionContext<AuthStateI, RootStateI>, payload: number) {
    // get current project from getters
    const { projects } = context.getters;
    // find the project with the given id
    const project = projects.find((p: ProjectI) => p.id === payload);
    // set the project
    context.commit('setProject', project);
    // reload the page
    window.location.reload();
  },
};
