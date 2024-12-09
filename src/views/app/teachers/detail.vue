<template>
  <div class="bg-white p-4 rounded-lg shadow-md">
    <h1 class="text-2xl font-bold text-gray-800">
      <span v-if="teacher.id">{{ teacher.firstName }} {{ teacher.lastName }}</span>
      <span v-else>Cargando...</span>
    </h1>
    <!-- line -->
    <hr class="my-4 border-t-2 border-gray-200" />
    <TeacherForm
      :fields="userFields"
      :loading="loading"
      @update="update"
      @submit="submit"
    />
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
  computed,
  defineAsyncComponent,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import { UserI } from '@/store/auth/state';
import { CustomFormStateI } from '@/store/custom-form/state';

const TeacherForm = defineAsyncComponent(() => import('@/components/global/custom-form.vue'));

const route = useRoute();
const router = useRouter();
const store = useStore();

const loading = ref(false);
const userFields = ref<CustomFormStateI[]>([
  {
    value: '',
    name: 'identificationType',
    label: 'Tipo de identificación',
    disabled: true,
    type: 'select',
    options: [
      { value: 'cc', label: 'Cédula de ciudadanía' },
      { value: 'ce', label: 'Cédula de extranjería' },
      { value: 'ti', label: 'Tarjeta de identidad' },
      { value: 'pp', label: 'Pasaporte' },
    ],
    required: true,
  },
  {
    value: '',
    name: 'identification',
    label: 'Número de identificación',
    type: 'text',
    required: true,
    disabled: true,
  },
  {
    value: '',
    name: 'firstName',
    label: 'Nombres',
    type: 'text',
    required: true,
  },
  {
    value: '',
    name: 'lastName',
    label: 'Apellidos',
    type: 'text',
    required: true,
  },
  {
    value: '',
    name: 'email',
    label: 'Correo electrónico',
    type: 'email',
    required: true,
    disabled: true,
    rules: 'email',
    placeholder: 'Ejemplo: correo@example.com',
  },
]);

const teacher = computed<UserI>(() => store.state.teachers.teacher);

function setTeacherInfo() {
  userFields.value.forEach((field) => {
    // eslint-disable-next-line no-param-reassign
    field.value = teacher.value[field.name as keyof UserI];
  });
}

function update(updatedField: CustomFormStateI) {
  const field = userFields.value.find((f) => f.name === updatedField.name);

  if (field) {
    field.value = updatedField.value;
  }
}

async function submit() {
  const email = userFields.value.find((f) => f.name === 'email') as CustomFormStateI;

  if (!email.value) {
    if (!email.value) {
      email.error = 'Debe ingresar al menos un correo electrónico';
    }

    store.commit('notificatons/addNotification', {
      message: 'Debe ingresar al menos un correo electrónico',
      type: 'error',
    });
    return;
  }

  loading.value = true;

  try {
    const payload = userFields.value.reduce((acc, field) => {
      acc[field.name as keyof UserI] = field.value as never;
      return acc;
    }, {} as UserI);

    payload.id = teacher.value.id;

    await store.dispatch('teachers/update', payload);
    store.commit('notifications/addNotification', {
      message: 'Docente guardado correctamente',
      type: 'success',
    });

    router.push('/app/teachers');
  } catch (error: any) {
    console.log('error', error);
    const msg = error.response?.data?.error || 'Ocurrió un error al crear el docente';
    store.commit('notifications/addNotification', {
      message: msg,
      type: 'error',
    });
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  loading.value = true;
  try {
    await store.dispatch('teachers/getbyid', route.params.id);
    setTeacherInfo();
    document.title = `${teacher.value.firstName} ${teacher.value.lastName} - digi-edu`;
  } catch (error: any) {
    const msg = error.response.data.error || 'Ha ocurrido un error';
    store.commit('notification/addNotification', {
      type: 'error',
      message: msg,
    });
  } finally {
    loading.value = false;
  }
});
</script>
