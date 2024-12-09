<template>
  <div class="bg-white p-4 rounded-lg shadow-md">
    <h1 class="text-2xl font-bold text-gray-800">Nuevo docente</h1>
    <!-- line -->
    <hr class="my-4 border-t-2 border-gray-200" />
    <NewTeacherForm
      :fields="userFields"
      :loading="loading"
      @update="update"
      @submit="submit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import { CustomFormStateI } from '@/store/custom-form/state';
import { UserI } from '@/store/auth/state';

const router = useRouter();
const route = useRoute();
const store = useStore();

const NewTeacherForm = defineAsyncComponent(() => import('@/components/global/custom-form.vue'));

const userFields = ref<CustomFormStateI[]>([
  {
    value: '',
    name: 'identificationType',
    label: 'Tipo de identificación',
    disabled: false,
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
    disabled: false,
    rules: 'email',
    placeholder: 'Ejemplo: correo@example.com',
  },
]);
const loading = ref(false);

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

    await store.dispatch('teachers/add', payload);
    store.commit('notification/addNotification', {
      message: 'Docente creado correctamente',
      type: 'success',
    });

    const to = route.query.to as string;
    if (to) {
      router.push({ path: to });
      return;
    }
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

onMounted(() => {
  const idType = route.query.identificationType as string;
  const identification = route.query.identification as string;

  if (idType) {
    const idTypeField = userFields.value.find((field) => field.name === 'identificationType');
    if (idTypeField) {
      idTypeField.value = idType;
      idTypeField.disabled = true;
    }
  }

  if (identification) {
    const identificationField = userFields.value.find((field) => field.name === 'identification');
    if (identificationField) {
      identificationField.value = identification;
      identificationField.disabled = true;
    }
  }
});
</script>
