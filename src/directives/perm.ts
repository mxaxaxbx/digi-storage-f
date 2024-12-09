import { App } from 'vue';

import { decode } from '@/utils/custom-enc-dec';

import { PermissionI } from '@/store/auth/state';

const perms = (): PermissionI[] => {
  const encodedPermissions = localStorage.getItem('permissions');
  if (!encodedPermissions) return [];
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
};

function validatePerm(perm: string) {
  const permSplit = perm.split('/');
  const resource = permSplit[0];
  const name = permSplit[1];
  const exists = perms().some((p) => p.resourceName === resource && p.name === name);
  return exists;
}

const handlePerm = (el: HTMLLinkElement) => {
  const p = el.getAttribute('data-perm');
  if (!p) {
    // remove the element from the DOM
    el.remove();
    return;
  }
  const isValid = validatePerm(p);
  if (!isValid) {
    // remove the element from the DOM
    el.remove();
  }
};

const unbind = (el: any) => {
  el.remove();
};

const install = (app: App) => {
  app.directive('validate-perm', {
    mounted: handlePerm,
    unmounted: unbind,
  });
};

export default install;
