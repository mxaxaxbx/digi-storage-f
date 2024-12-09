<template>
  <div>
    <!-- list -->
    <div class="px-3 py-5 bg-white">
      <!-- title -->
      <h2 class="font-bold"> Lista de docentes </h2>
      <div class="border-t border-gray-400 my-2 mb-5"></div>
      <!-- search box -->
      <div class="flex justify-between items-center mb-5">
        <label for="search" class="text-gray-500"></label>
        <input
          v-model="find.query"
          @keyup="search"
          type="text"
          class="w-full border border-gray-200 rounded-lg p-2"
          placeholder="Buscar por nombre o email"
        />
        <button
          @click="getData"
          class="btn btn-primary border border-gray-200 rounded-lg h-10 p-2"
        >
          <i class="fas fa-search"></i>
        </button>
      </div>
      <!-- loading -->
      <div v-if="loading" class="flex justify-center items-center">
        <i class="fas fa-spinner fa-spin text-2xl"></i>
      </div>
      <!-- if not results -->
      <div v-else-if="!teachersResults.data.length" class="flex justify-center items-center">
        <p class="text-gray-500">No hay resultados</p>
      </div>
      <!-- results -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- results -->
        <div
          v-for="teacher in teachersResults.data"
          :key="teacher.id"
          class="border border-gray-200 rounded-lg p-4"
        >
          <div class="flex items center justify-between">
            <div class="flex items center">
              <div>
                <router-link
                  :to="`/app/teachers/${teacher.id}`"
                  class="text-lg font-semibold text-gray-800"
                >
                  {{ teacher.firstName }} {{ teacher.lastName }}
                </router-link><br/>
                <span class="text-sm text-gray-400">{{ teacher.email }}</span>
              </div>
            </div>
            <div>
              <router-link :to="`/app/teachers/${teacher.id}`" class="btn btn-primary">
                <i class="fas fa-edit"></i>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <!-- pages if data -->
      <div
        v-if="teachersResults.data.length > 0"
        class="flex space-x-1 justify-center items-center mt-5"
      >
        <!-- previous -->
        <router-link
          :to="getPaginatedLink('previous', Number(find.page))"
          class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        >
          <i class="fas fa-chevron-left"></i>
        </router-link>
        <!-- pages only show 5 around the current page -->
        <div v-for="page in teachersResults.totalPages" :key="page">
          <router-link
            :to="getPaginatedLink('page', page)"
            v-if="
              Math.abs(page - currentPage) < 2 || page === 1 || page === teachersResults.totalPages
            "
            class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            :class="page === currentPage ? 'bg-orange-700' : 'bg-orange-500'"
          >
            {{ page }}
          </router-link>

        </div>
        <!-- next -->
        <router-link
          :to="getPaginatedLink('next', Number(find.page))"
          class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        >
          <i class="fas fa-chevron-right"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
  computed,
  watch,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import { PaginationI } from '@/store/state';
import { TeachersResultI } from '@/store/teachers/state';

const store = useStore();
const route = useRoute();
const router = useRouter();

const teachersResults = computed<TeachersResultI>(() => store.state.teachers.teachersResult);

const loading = ref(false);
const find = ref<PaginationI>({
  page: 1,
  limit: 10,
  query: '',
});
const currentPage = ref(1);
const debounceTimeout = ref<ReturnType<typeof setTimeout> | null>(null);

async function getData() {
  loading.value = true;
  try {
    currentPage.value = Number(route.query.page) || 1;
    await store.dispatch('teachers/filter', find.value);
  } catch (err: any) {
    const msg = err.response.data.error || 'Error al cargar los pacientes';
    store.commit('notifications/addNotification', {
      message: msg,
      type: 'error',
    });
  } finally {
    loading.value = false;
  }
}

function getPaginatedLink(action: string, page?: number) {
  const query = route.query.query || '';
  switch (action) {
    case 'previous':
      return `/app/teachers?page=${Math.max(1, Number(find.value.page) - 1)}&query=${query}`;
    case 'next':
      return `/app/teachers?page=${Math.min(
        teachersResults.value.totalPages,
        Number(find.value.page) + 1,
      )}&query=${query}`;
    default:
      return `/app/teachers?page=${page}&query=${query}`;
  }
}

// const hasPerm = (permission: string) => {
//   // permission contains an string with the following format: 'resource/permission'
//   // example: 'teachers/list
//   const permSplit = permission.split('/');
//   const [r] = permission.split('/');
//   const p = permSplit.slice(1).join('/');
//   return permissions.value
//     .find((perm: PermissionsI) => perm.resourceName === r && perm.name === p);
// };

function search(ev: KeyboardEvent) {
  ev.preventDefault();

  if (debounceTimeout.value) {
    clearTimeout(debounceTimeout.value);
  }

  debounceTimeout.value = setTimeout(() => {
    router.push({
      query: {
        page: 1,
        query: find.value.query,
      },
    });
  }, 3000);
}

onMounted(() => {
  find.value.page = Math.max(route.query.page ? Number(route.query.page) : 1, 1);
  find.value.query = route.query.query ? String(route.query.query) : '';
  getData();
});

watch(route, () => {
  find.value.page = Math.max(route.query.page ? Number(route.query.page) : 1, 1);
  find.value.query = route.query.query ? String(route.query.query) : '';
  getData();
});

</script>
