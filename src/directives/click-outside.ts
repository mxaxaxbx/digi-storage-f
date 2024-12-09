import { App, DirectiveBinding } from 'vue';

const handleClickOutside = (el: any, binding: DirectiveBinding) => {
  const onClick = (e: Event) => {
    if (!el.contains(e.target as Node)) {
      binding.value();
    }
  };

  document.addEventListener('click', onClick);
  // eslint-disable-next-line no-param-reassign
  el.clickOutside = onClick;
};

const unbind = (el: any) => {
  document.removeEventListener('click', el.clickOutside);
  // eslint-disable-next-line no-param-reassign
  delete el.clickOutside;
};

const install = (app: App) => {
  app.directive('click-outside', {
    mounted: handleClickOutside,
    unmounted: unbind,
  });
};

export default install;
