<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

onMounted(() => {
  const isAuthenticated = store.getters['auth/isAuthenticated'];
  if (!isAuthenticated) {
    store.dispatch('auth/logout');
  }
});
</script>
