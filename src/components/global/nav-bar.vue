<template>
  <nav
    class="
      w-100
      bg-gray-300
      p-4
      flex items-center space-x-4
    "
  >
    <button @click="toggleSidebar">
      <i class="fas fa-bars"></i>
    </button>
    <router-link to="/" class="text-2xl font-bold text-orange-500">edu</router-link>
    <div class="shrink w-5/6"></div>

    <Dropdown
      v-if="isAuthenticated"
      :content="dropdownContent"
      :options="dropdownOptions"
      :loading="loading"
      @action="handleAction"
    />
    <a v-else :href="usersLink" aria-label="User Profile">
      <i class="fas fa-user" aria-hidden="true"></i>
      <span class="sr-only">User Profile</span>
    </a>
  </nav>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent, computed } from 'vue';
import { useStore } from 'vuex';

import { UserI } from '@/store/auth/state';
import { OptionI } from '@/store/state';

const Dropdown = defineAsyncComponent(() => import('@/components/global/dropdown.vue'));
const store = useStore();

const loading = ref<boolean>(false);

const { VUE_APP_DIGI_USERS_F } = process.env;

const usersLink = ref(`${VUE_APP_DIGI_USERS_F}/auth/login?app=edu`);

const isAuthenticated = computed(() => store.getters['auth/isAuthenticated']);
const user = computed<UserI>(() => store.getters['auth/user']);

const dropdownContent = ref<string>(user.value ? `
  <span>
    ${user.value.firstName.charAt(0)}
    ${user.value.lastName.charAt(0)}
  </span>
` : `
  <i class="fas fa-user" aria-hidden="true"></i>
  <span class="sr-only">User Profile</span>
`);

const dropdownOptions: OptionI[] = [
  { content: 'cerrar sesión', action: 'logout' },
];

function handleAction(action: string) {
  if (action === 'logout') {
    store.dispatch('auth/logout');
  }
}

function toggleSidebar() {
  store.commit('toggleSidebar');
}

</script>
