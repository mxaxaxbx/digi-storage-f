<template>
  <div class="bg-white p-4">
    <h2 class="text-lg font-semibold mb-4 text-purple-500">
      {{ course.title }}
    </h2>
    <!-- line -->
    <div class="bg-gray-200 h-0.5 w-full mb-4"></div>
    <!-- form -->
    <form @submit.prevent="saveCourse">
      <div
        v-validate-perm
        data-perm="courses/update"
        class="grid grid-cols-1 gap-4"
      >
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
          <!-- {{ course.description }} -->
          <label for="course-description" class="text-sm font-semibold"> Course description </label>
          <editor :content="course.description" />
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
  computed,
  defineAsyncComponent,
} from 'vue';
import { CourseI } from '@/store/courses/state';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const editor = defineAsyncComponent(() => import('@/components/global/WYSIWYG-editor.vue'));

const store = useStore();
const route = useRoute();
const router = useRouter();

const course = computed<CourseI>(() => store.state.courses.course);

const loading = ref(false);

function setCourseTitle() {
  document.title = `${course.value.title} - digi-storage`;
}

async function getCourse() {
  loading.value = true;
  try {
    const name = route.params.id as string;
    const splitedName = name.split('-');
    const id = splitedName[splitedName.length - 1];
    await store.dispatch('courses/get', id);
    setCourseTitle();
  } catch (error: any) {
    console.error(error);
    const msg = error.response.data.error || error.message;
    store.commit('notifications/addNotification', { text: msg, type: 'error' });
  } finally {
    loading.value = false;
  }
}

async function saveCourse() {
  loading.value = true;
  try {
    await store.dispatch('courses/update', course.value);
    store.commit('notifications/addNotification', { text: 'Course updated', type: 'success' });
    router.push('/app/courses');
  } catch (error: any) {
    console.error(error);
    const msg = error.response.data.error || error.message;
    store.commit('notifications/addNotification', { text: msg, type: 'error' });
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  getCourse();
});

</script>
