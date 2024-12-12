<template>
  <div class="bg-white p-4">
    <h2 class="text-lg font-semibold mb-4 text-purple-500"> Add Course </h2>
    <!-- line -->
    <div class="bg-gray-200 h-0.5 w-full mb-4"></div>
    <!-- form -->
    <form @submit.prevent="saveCourse">
      <div class="grid grid-cols-1 gap-4">
        <div>
          <label for="course-title" class="text-sm font-semibold"> Course title </label>
          <input
            type="text"
            id="course-title"
            v-model="course.title"
            class="
              w-full
              border border-gray-300
              rounded p-2
              focus:outline
            "
          />
        </div>
        <div>
          <label for="course-description" class="text-sm font-semibold"> Course description </label>
          <editor v-model:content="course.description" />
        </div>
      </div>
      <div class="mt-4 flex justify-end">
        <button
          type="submit"
          @click="saveCourse"
          :disabled="loading"
          class="
            bg-purple-500
            text-white
            px-4 py-2
            rounded
            hover:bg-purple-600
          "
        >
          <i v-if="loading" class="fas fa-spinner fa-spin"></i>
          Add course
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import { CourseI } from '@/store/courses/state';

const editor = defineAsyncComponent(() => import('@/components/global/WYSIWYG-editor.vue'));

const store = useStore();
const router = useRouter();

const course = ref<CourseI>({
  id: 0,
  teacherId: 0,
  title: '',
  description: '',
});

const loading = ref(false);

async function saveCourse() {
  loading.value = true;
  try {
    await store.dispatch('courses/add', course.value);
    router.push({ path: '/app/courses' });
  } catch (error: any) {
    const msg = error.response.data.error || 'An error occurred saving the course';
    store.commit('notifications/addNotification', { type: 'error', message: msg });
  } finally {
    loading.value = false;
  }
}

</script>
