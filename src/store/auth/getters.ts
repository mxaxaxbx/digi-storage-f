import { GetterTree } from 'vuex';

import { decode } from '@/utils/custom-enc-dec';

import {
  AuthStateI,
  UserI,
  ProjectI,
  PermissionI,
} from './state';
import { RootStateI } from '../state';

export const getters: GetterTree<AuthStateI, RootStateI> = {
  isAuthenticated: (state) => {
    const user = localStorage.getItem('user');
    const projects = localStorage.getItem('projects');
    const project = localStorage.getItem('project');
    const perms = localStorage.getItem('permissions');
    const token = localStorage.getItem('token');
    return !!user && !!projects && !!project && !!perms && !!token;
  },
  user: (state) => {
    const encodedUser = localStorage.getItem('user');
    if (!encodedUser) return state.user;
    const u = decode(encodedUser).value as any;
    const user: any = {};
    Object.keys(u).forEach((key) => {
      // convert the first letter of the key to lowercase
      const newKey = key.charAt(0).toLowerCase() + key.slice(1);
      user[newKey] = u[key];
    });
    return user as UserI;
  },
  projects: (state) => {
    const encodedProjects = localStorage.getItem('projects');
    if (!encodedProjects) return state.projects;
    const projetcs = decode(encodedProjects).value as ProjectI[];
    const projectsMapped = projetcs.map((project: any) => {
      const p: any = {};
      Object.keys(project).forEach((key) => {
        if (key === 'ID') {
          p.id = Number(project[key]);
          return;
        }
        // convert the first letter of the key to lowercase
        const newKey = key.charAt(0).toLowerCase() + key.slice(1);
        p[newKey] = project[key];
      });
      return p as ProjectI;
    });
    return projectsMapped;
  },
  project: (state) => {
    const encodedProject = localStorage.getItem('project');
    if (!encodedProject) return state.project;
    const project: any = decode(encodedProject).value;
    const projectMapped: any = {};
    Object.keys(project).forEach((key) => {
      if (key === 'ID') {
        projectMapped.id = Number(project[key]);
        return;
      }
      // convert the first letter of the key to lowercase
      const newKey = key.charAt(0).toLowerCase() + key.slice(1);
      projectMapped[newKey] = project[key];
    });
    return projectMapped as ProjectI;
  },
  permissions: (state) => {
    const encodedPermissions = localStorage.getItem('permissions');
    if (!encodedPermissions) return state.permissions;
    const permissions = decode(encodedPermissions).value as any[];
    const permissionsMapped = permissions.map((permission: any) => {
      const p: any = {};
      Object.keys(permission).forEach((key) => {
        if (key === 'ID') {
          p.id = Number(permission[key]);
          return;
        }
        // convert the first letter of the key to lowercase
        const newKey = key.charAt(0).toLowerCase() + key.slice(1);
        p[newKey] = permission[key];
      });
      return p as PermissionI;
    });
    return permissionsMapped as PermissionI[];
  },
};
