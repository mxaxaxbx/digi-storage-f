<template>
  <div class="bg-gray-200">
    <Notifications />
    <!-- Dark overlay -->
    <div
      v-if="showSidebar"
      class="fixed inset-0 bg-black opacity-50 z-30"
      @click="toggleSidebar"
      @keydown="toggleSidebar"
    ></div>
    <!-- menu -->
    <div
      v-click-outside="clickOutside"
      class="
        w-full fixed
        z-40
        -mt-2
        mb-8
      "
    >
      <NavBar/>
      <!-- sidebar -->
      <Sidebar />
    </div>
    <!-- content -->
    <div
      class="pt-16"
      :class="{
        'blocker': showSidebar,
      }"
    >
      <router-view />
    </div>
    <!-- footer -->
    <footer class="bg-gray-800 text-white py-8">
      <div class="container mx-auto text-center">
        <p>&copy; 2024 digi-edu. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, computed } from 'vue';
import { useStore } from 'vuex';

const NavBar = defineAsyncComponent(() => import('./components/global/nav-bar.vue'));
const Sidebar = defineAsyncComponent(() => import('@/components/global/sidebar.vue'));
const Notifications = defineAsyncComponent(() => import('@/components/global/notifications.vue'));

const store = useStore();

const showSidebar = computed(() => store.state.sidebar);

function clickOutside() {
  if (showSidebar.value) store.commit('toggleSidebar');
}

function toggleSidebar() {
  store.commit('toggleSidebar');
}

</script>

<style scoped>
.blocker {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-color: rgba(0, 0, 0, 0.9); /* Change the alpha value for darkness */
  z-index: 20; /* Ensure it's above the sidebar */
}
</style>
