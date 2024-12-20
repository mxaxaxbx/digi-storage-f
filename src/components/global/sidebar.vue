<template>
  <aside
    v-show="showSidebar"
    id="default-sidebar"
    class="
      fixed z-40 w-64 h-screen
      border border-gray-300
      highlighted
    "
    aria-label="Sidebar"
  >
    <div
      class="
        h-full
        flex flex-col
        px-3 py-4
        bg-gray-100
      "
    >
      <h3 class="text-lg font-bold text-gray-900">Menú</h3>
      <!-- authenticated menu -->
      <ul v-if="isAuth" class="space-y-2 font-medium">
        <!-- files -->
        <li v-if="validatePermissions('storage/listfiles')">
          <router-link
            to="/app/files"
            class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
          >
            <i class="fas fa-chalkboard-teacher w-5 h-5 text-gray-500"></i>
            <span class="flex-1 ml-3 whitespace-nowrap"> Archivos </span>
          </router-link>
        </li>
      </ul>
      <!-- projects always at bottom -->
      <div v-if="isAuth" class="flex-1"></div>
      <div
        v-if="isAuth"
        class="
          w-full
          sticky
          bottom-0
          pb-10
        "
      >
        <label for="projectID">
          <select
            v-model="project.id"
            @change="changeProject"
            id="projectID"
            class="
              bg-gray-50
              border border-gray-300
              text-gray-900 text-sm
              rounded-lg
              focus:border-blue-500
              block w-full
              p-2.5
            "
          >
            <option selected disabled value="">Selecciona un valor</option>
            <option
              v-for="p in projects"
              :key="p.id"
              :value="p.id"
              :selected="p.id === project.id"
            >
              {{ p.name }}
            </option>
          </select>
        </label>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

import { PermissionI, ProjectI } from '@/store/auth/state';

const store = useStore();
const route = useRoute();

const showSidebar = computed(() => store.state.sidebar);

const isAuth = computed(() => store.getters['auth/isAuthenticated']);
const projects = computed<ProjectI[]>(() => store.getters['auth/projects']);
const project = computed<ProjectI>(() => store.getters['auth/project']);
const permissions = computed<PermissionI[]>(() => store.getters['auth/permissions']);

function validatePermissions(perm: string) {
  const permSplit = perm.split('/');
  const resource = permSplit[0];
  const name = permSplit[1];
  const exists = permissions.value.some((p) => p.resourceName === resource && p.name === name);
  return exists;
}

function changeProject(ev: Event) {
  const projectID = (ev.target as HTMLSelectElement).value;
  store.dispatch('auth/changeProject', Number(projectID));
}

// check if the path has changed, then close the sidebar
watch(() => route.path, () => {
  store.commit('closeSidebar');
});

</script>
