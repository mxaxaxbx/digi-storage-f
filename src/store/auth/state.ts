export interface ProjectI {
  id: number;
  name: string;
}

export interface PermissionI {
  id: number;
  name: string;
  resourceID: number;
  resourceName: string;
}

export interface UserI {
  id: number;
  identificationNumber: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isActive: boolean;
  resetPassword: boolean;
  lang: string;
  twoFactors: boolean;
}

export interface AuthStateI {
  token: string;
  projects: ProjectI[];
  permissions: PermissionI[];
  user?: UserI;
  project?: ProjectI;
}

export interface SendCodeI {
  email: string;
  code?: string;
  app?: string;
}

export const state: AuthStateI = {
  token: '',
  projects: [],
  permissions: [],
};
