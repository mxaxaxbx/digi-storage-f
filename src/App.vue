<template>
  <NavBar/>
  <router-view/>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const NavBar = defineAsyncComponent(() => import('./components/global/nav-bar.vue'));
</script>
