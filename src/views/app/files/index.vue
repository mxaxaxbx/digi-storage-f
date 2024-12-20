<template>
  <!-- actions -->
  <div
    class="
      flex justify-between items-center
      mb-4 px-3 py-2
      bg-gray-300
      border border-gray-400
    "
  >
    <router-link
      to="/app/files"
      class="text-2xl font-semibold text-purple-900"
    >
      Archivos
    </router-link>
    <div>
      <label
        for="fileInput"
        class="
          bg-purple-500
          hover:bg-purple-700
          text-white font-bold
          py-2 px-4
          rounded cursor-pointer
        "
      >
        <input
          id="fileInput"
          type="file"
          class="hidden"
          ref="fileInput"
          @change="uploadFile"
          :multiple="false"
        />
        <!-- upload file icon -->
        <i class="fas fa-upload"></i>
        Subir Archivo
      </label>
    </div>
  </div>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const loading = ref(false);

async function uploadFile(ev: Event): Promise<void> {
  loading.value = true;
  try {
    const target = ev.target as HTMLInputElement;
    if (!target.files) {
      return;
    }

    const file = target.files[0];
    console.log('file', file);
    const formData = new FormData();
    formData.append('file', file);

    console.log('formData', formData.get('file'));

    await store.dispatch('files/upload', formData);
    store.commit('notifications/addNotification', {
      type: 'success',
      message: 'Archivo subido correctamente',
    });
  } catch (error: any) {
    console.error(error);
    const msg = error.response?.data?.error || 'Error al subir el archivo';
    store.commit('notifications/addNotification', {
      type: 'error',
      message: msg,
    });
  } finally {
    loading.value = false;
  }
}
</script>
