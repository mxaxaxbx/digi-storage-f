<template>
  <div>
    <div class="
        block max-w-sm
        p-6 bg-white border
        border-gray-200 rounded-lg shadow
      ">
      <div class="flex space-x-5 items-center">
        <router-link
          to="/app/teachers"
          class="
            text-gray-800
            hover:text-gray-400
            focus:outline-none focus:text-gray-400
          "
        >
          <i class="fas fa-arrow-left"></i>
        </router-link>
        <h5
          class="
            mb-2 text-2xl font-bold
            tracking-tight
          "
        >
          Buscar docente
        </h5>
      </div>
      <div class="border border-gray-200 rounded-lg shadow-sm"></div>
      <form action="#" class="my-10" @submit.prevent="submit" id="search-form">
        <label for="searchBy" class="font-bold"> Buscar por </label>
        <select v-model="searchBy" id="searchBy" class="
            bg-gray-50
            border border-gray-300
            text-gray-900 text-sm
            rounded-lg
            focus:border-blue-500
            block w-full
            p-2.5
          ">
          <option value="identification" selected>
            Tipo y número de documento de identidad
          </option>
        </select>

        <div v-if="searchBy === 'identification'" class="mt-8">
          <!-- document type -->
          <label for="identificationType" class="font-bold"> Tipo de documento </label>
          <select id="identificationType" v-model="identificationType" required class="
              bg-gray-50
              border border-gray-300
              text-gray-900 text-sm
              rounded-lg
              focus:border-blue-500
              block w-full
              p-2.5
            " :class="{ 'border-red-500': error.identificationType }">
            <option value="" selected disabled>
              Seleccione una opción
            </option>
            <option v-for="t in identificationTypes" :key="t.value" :value="t.value">
              {{ t.label }}
            </option>
          </select>
          <p v-if="error.identificationType" class="text-red-500 text-sm mt-1">
            {{ error.identificationType }}
          </p>
          <!-- identification number -->
          <label for="identification" class="font-bold"> Número de documento </label>
          <input id="identification" v-model="identification" required type="text" class="
              bg-gray-50
              border border-gray-300
              text-gray-900 text-sm
              rounded-lg
              focus:border-blue-500
              block w-full
              p-2.5
            " :class="{ 'border-red-500': error.identification }" />
          <p v-if="error.identification" class="text-red-500 text-sm mt-1">
            {{ error.identification }}
          </p>
        </div>

        <div class="flex justify-between">
          <router-link to="/app/teachers" class="
              bg-gray-200
              text-gray-900
              text-sm
              font-semibold
              rounded-lg
              focus:outline-none
              focus:ring-2 focus:ring-gray-200
              focus:ring-offset-2
              mt-8
              px-4 py-2
            ">
            Cancelar
          </router-link>
          <button type="submit" class="
              bg-purple-500
              text-white
              text-sm
              font-semibold
              rounded-lg
              focus:outline-none
              focus:ring-2 focus:ring-purple-500
              focus:ring-offset-2
              mt-8
              px-4 py-2
            " :class="{ 'cursor-not-allowed opacity-50': loading }" :disabled="loading">
            <i class="fas fa-spinner animate-spin" v-if="loading" />
            Buscar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const searchBy = ref('identification');
const identificationTypes = ref([
  { value: 'cc', label: 'Cédula de ciudadanía' },
  { value: 'ce', label: 'Cédula de extranjería' },
  { value: 'ti', label: 'Tarjeta de identidad' },
  { value: 'pp', label: 'Pasaporte' },
]);
const identificationType = ref('cc');
const identification = ref('');

const error = ref({
  identification: '',
  identificationType: '',
});

const loading = ref(false);

const store = useStore();
const router = useRouter();

const submit = async () => {
  if (!identificationType.value) {
    error.value.identificationType = 'El tipo de documento es requerido';
  } else {
    error.value.identificationType = '';
  }

  if (!identification.value) {
    error.value.identification = 'El número de documento es requerido';
  } else {
    error.value.identification = '';
  }

  loading.value = true;

  try {
    const payload = {
      identificationType: identificationType.value,
      identification: identification.value,
    };

    const res = await store.dispatch('teachers/filter', payload);
    if (res.data.length === 0) {
      router.push({
        path: '/app/teachers/new',
        query: {
          identificationType: identificationType.value,
          identification: identification.value,
        },
      });
      return;
    }

    router.push({
      path: `/app/teachers/${res.data[0].id}`,
    });
  } catch (err: any) {
    console.error('error', err);
    const message = err.response?.data?.message || 'Ocurrió un error mientras se consultaban los datos. Intente de nuevo mas tarde';
    store.commit('notifications/addNotification', {
      type: 'error',
      message,
    });
  } finally {
    loading.value = false;
  }
};

</script>
