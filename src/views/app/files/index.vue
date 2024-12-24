<template>
  <!-- actions -->
  <!-- upload progress bar -->
  <div v-if="loading" class="mb-4">
    <div class="relative pt-1">
      <div class="flex mb-2 items-center justify-between">
        <div>
          <span
            class="
              text-xs font-semibold uppercase
              inline-block
              py-1 px-2
              rounded-full
              text-purple-600
              bg-purple-200
            "
          >
            Subiendo archivo
          </span>
          <span class="text-xs font-semibold inline-block text-purple-600">
            {{ file?.name }}
          </span>
        </div>
        <div class="text-right">
          <span class="text-xs font-semibold inline-block text-purple-600">
            {{ Math.round(100 * progress) }}%
          </span>
        </div>
      </div>
      <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
        <div
          :style="{ width: `${Math.round(100 * progress)}%` }"
          class="
            shadow-none
            flex flex-col
            text-center whitespace-nowrap text-white
            justify-center
            bg-purple-500
          "
        ></div>
      </div>
    </div>
  </div>
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
        :class="{ 'opacity-50': loading }"
      >
        <input
          id="fileInput"
          type="file"
          class="hidden"
          ref="fileInput"
          @change="uploadFile"
          :multiple="false"
          :disabled="loading"
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
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const loading = ref(false);
const file = ref<File | null>(null);

const progress = computed<number>(() => store.state.files.uploadProgress);

async function uploadFile(ev: Event): Promise<void> {
  loading.value = true;
  try {
    const target = ev.target as HTMLInputElement;
    if (!target.files) {
      return;
    }

    [file.value] = target.files;
    const formData = new FormData();
    formData.append('file', file.value);

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
