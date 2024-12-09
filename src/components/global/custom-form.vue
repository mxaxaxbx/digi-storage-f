<template>
  <form @submit.prevent="submit">
    <div v-for="(field, i) in props.fields" :key="i">
      <!-- text or email inputs -->
      <div v-if="field.type === 'text' || field.type === 'email'" class="my-5">
        <label
          :for="field.name"
          class="font-bold"
          :class="{ 'text-red-500': field.error }"
        >
          {{ field.label }}:
        </label>
        <input
          :type="field.type"
          :name="field.name"
          :id="field.name"
          :value="typeof field.value === 'boolean' ? '' : field.value"
          :required="field.required"
          :placeholder="field.placeholder"
          :readonly="field.readonly"
          :disabled="field.disabled"
          class="
            bg-gray-50
            border border-gray-300
            text-gray-900 text-sm
            rounded-lg
            focus:border-blue-500
            block w-full
            p-2.5
          "
          :class="{ 'border-red-500': field.error }"
          @keyup="validateField"
        />
        <p v-if="field.error" class="text-red-500 text-sm mt-1">
          {{ field.error }}
        </p>
      </div>
      <!-- select inputs -->
      <div v-if="field.type === 'select'" class="my-5">
        <label
          v-if="field.showLabel === true || field.showLabel === undefined"
          :for="field.name"
          class="font-bold"
          :class="{ 'text-red-500': field.error }"
        >
          {{ field.label }}:
        </label>
        <select
          :name="field.name"
          :id="field.name"
          :required="field.required"
          :value="typeof field.value === 'boolean' ? '' : field.value"
          :disabled="field.disabled"
          class="
            bg-gray-50
            border border-gray-300
            text-gray-900 text-sm
            rounded-lg
            focus:border-blue-500
            block w-full
            p-2.5
          "
          :class="{ 'border-red-500': field.error }"
          @change="validateField"
          @input="validateField"
          @focus="validateField"
        >
          <option value="" disabled selected>Selecciona una opción</option>
          <option
            v-for="(option, i) in field.options"
            :key="i"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
        <p v-if="field.error" class="text-red-500 text-sm mt-1">
          {{ field.error }}
        </p>
      </div>
      <!-- select search inputs -->
      <div v-if="field.type === 'selectsearch'" class="my-5">
        <label
          v-if="field.showLabel === true || field.showLabel === undefined"
          :for="field.name"
          class="font-bold"
          :class="{ 'text-red-500': field.error }"
        >
          {{ field.label }}:
        </label>
        <div
          class="
            flex items-center justify-between
            border border-gray-300
            text-gray-900 text-sm
            rounded-lg
            focus:border-blue-500
            block w-full
            p-2.5
          "
        >
          <input
            :id="field.name"
            :type="field.type"
            :placeholder="field.placeholder"
            :name="field.name"
            :value="field.query"
            @keyup="updateQuery"
            class="w-full focus:outline-none bg-transparent"
            autocomplete="off"
          />
          <!-- clear input -->
          <button
            type="button"
            class="text-gray-500"
            @click="emits('updateQuery', { ...field, query: '' })"
          >
            <font-awesome-icon icon="fa-times" />
          </button>
        </div>
        <!-- options -->
        <ul
          v-if="
            getFilteredOptions(field.name, field.query).length &&
            field.showOptions
          "
          class="
            absolute z-10
            w-full
            mt-1
            bg-white sm:text-sm
            border border-gray-300 rounded-md shadow-lg
            max-h-60
            overflow-auto
            focus:outline-none
          "
        >
          <li
            v-for="(option, index) in field.options"
            :key="index"
            class="cursor-pointer select-none relative py-2 pl-3 pr-9"
            :class="{
              'text-white bg-indigo-600': highlightedIndex === index,
              'text-gray-900': highlightedIndex !== index,
            }"
          >
            <button
              class="block truncate"
              :class="{
                'font-semibold': highlightedIndex === index,
                'font-normal': highlightedIndex !== index,
              }"
              @click="setSelectSearchOption(field.name, option)"
            >
              {{ option.label }}
            </button>
          </li>
        </ul>
        <!-- no options -->
        <ul
          v-if="!getFilteredOptions(field.name, field.query).length && field.query?.length"
          class="
            absolute z-10 w-full
            mt-1
            bg-white sm:text-sm
            border border-gray-300 rounded-md shadow-lg
            max-h-60
            overflow-auto
            focus:outline-none
          "
        >
          <li class="cursor-pointer select-none relative py-2 pl-3 pr-9">
            <button
              type="button"
              @click="emits('addnew', field)"
              class="block truncate"
            >
              <i class="fa fa-exclamation-triangle text-red-500"></i>
              Agregar nuevo {{ field.label }}
            </button>
          </li>
        </ul>
        <p v-if="field.error" class="text-red-500 text-sm mt-1">
          {{ field.error }}
        </p>
      </div>
      <!-- date inputs -->
      <div v-if="field.type === 'date'" class="my-5">
        <label
          :for="field.name"
          class="font-bold"
          :class="{ 'text-red-500': field.error }"
        >
          {{ field.label }}:
        </label>
        <input
          :type="field.type"
          :name="field.name"
          :id="field.name"
          :value="typeof field.value === 'boolean' ? '' : field.value"
          :required="field.required"
          :readonly="field.readonly"
          :disabled="field.disabled"
          class="
            bg-gray-50
            border border-gray-300
            text-gray-900 text-sm
            rounded-lg
            focus:border-blue-500
            block w-full
            p-2.5
          "
          :class="{ 'border-red-500': field.error }"
          @change="validateField"
          @input="validateField"
          @focus="validateField"
        />
        <p v-if="field.error" class="text-red-500 text-sm mt-1">
          {{ field.error }}
        </p>
      </div>
      <!-- date time inputs -->
      <div v-if="field.type === 'datetime'" class="my-5">
        <label
          :for="field.name"
          class="font-bold"
          :class="{ 'text-red-500': field.error }"
        >
          {{ field.label }}:
        </label>
        <input
          :x-ref="field.type"
          type="datetime-local"
          :name="field.name"
          :id="field.name"
          :value="dateTimeUnixToInput(field.value)"
          :required="field.required"
          :readonly="field.readonly"
          :disabled="field.disabled"
          class="
            bg-gray-50
            border border-gray-300
            text-gray-900 text-sm
            rounded-lg
            focus:border-blue-500
            block w-full
            p-2.5
          "
          :class="{ 'border-red-500': field.error }"
          @change="validateField"
          @input="validateField"
          @focus="validateField"
          data-input
        />
        <p v-if="field.error" class="text-red-500 text-sm mt-1">
          {{ field.error }}
        </p>
      </div>
      <!-- textarea inputs -->
      <div v-if="field.type === 'textarea'" class="my-5">
        <label
          :for="field.name"
          class="font-bold"
          :class="{ 'text-red-500': field.error }"
        >
          {{ field.label }}:
        </label>
        <textarea
          :name="field.name"
          :id="field.name"
          :value="field.value"
          :required="field.required"
          :placeholder="field.placeholder"
          :readonly="field.readonly"
          :disabled="field.disabled"
          class="
            bg-gray-50
            border border-gray-300
            text-gray-900 text-sm
            rounded-lg
            focus:border-blue-500
            block w-full
            p-2.5
          "
          :class="{ 'border-red-500': field.error }"
          @keyup="validateField"
        ></textarea>
        <p v-if="field.error" class="text-red-500 text-sm mt-1">
          {{ field.error }}
        </p>
      </div>
    </div>
    <!-- actions -->
    <div v-if="props.showActions" class="flex justify-end mt-5">
      <button
        type="submit"
        class="
          bg-orange-500
          hover:bg-orange-700
          text-white
          font-bold
          py-2 px-4
          rounded-lg
          focus:border-orange-500
        "
        :class="{ 'cursor-not-allowed opacity-50': props.loading }"
      >
        <i class="fa fa-spinner fa-spin" v-if="props.loading"></i>
        Guardar
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';
import { useStore } from 'vuex';
import moment from 'moment';

import { CustomFormStateI, FormOptionsI } from '@/store/custom-form/state';

const emits = defineEmits(['update', 'submit', 'updateQuery', 'addnew']);

const store = useStore();

const highlightedIndex = ref(0);

const props = defineProps({
  fields: {
    type: Array as () => CustomFormStateI[],
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  showActions: {
    type: Boolean,
    default: true,
  },
});

const validaterules = async (field: CustomFormStateI) => {
  if (field.required) {
    if (!field.value) {
      emits('update', {
        ...field,
        error: `El campo ${field.label} es obligatorio`,
      });
    } else {
      emits('update', {
        ...field,
        error: '',
      });
    }
  }

  if (!field.rules) return;
  if (!field.value) return;

  const rules = field.rules?.split(',') ?? [];
  rules.forEach((rule) => {
    const [ruleName, ruleValue] = rule.split(':');
    switch (ruleName) {
      case 'min':
        if (typeof field.value === 'string' && field.value.length < Number(ruleValue)) {
          emits('update', {
            ...field,
            error: `El campo ${field.label} debe tener al menos ${ruleValue} caracteres`,
          });
        } else {
          emits('update', {
            ...field,
            error: '',
          });
        }
        break;

      case 'max':
        if (typeof field.value === 'string' && field.value.length > Number(ruleValue)) {
          emits('update', {
            ...field,
            error: `El campo ${field.label} debe tener máximo ${ruleValue} caracteres`,
          });
        } else {
          emits('update', {
            ...field,
            error: '',
          });
        }
        break;

      case 'email':
        if (!field.value) {
          emits('update', {
            ...field,
            error: '',
          });
          break;
        }
        // eslint-disable-next-line no-case-declarations
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (typeof field.value === 'string' && !emailRegex.test(field.value)) {
          emits('update', {
            ...field,
            error: `El campo ${field.label} debe ser un correo electrónico válido`,
          });
        } else {
          emits('update', {
            ...field,
            error: '',
          });
        }
        break;

      case 'datetime': {
        const date = moment.unix(Number(ruleValue));
        const dateFormated = date.format('YYYY-MM-DDTHH:mm');
        if (Number(field.value) < Number(ruleValue)) {
          emits('update', {
            ...field,
            error: `El campo ${field.label} debe ser mayor a la fecha ${dateFormated}`,
          });
        } else {
          emits('update', {
            ...field,
            error: '',
          });
        }
        break;
      }
      default:
        break;
    }
  });
};

const validateField = (ev: Event) => {
  // get rules of field
  const field = props.fields.find((f) => f.name === (ev.target as HTMLInputElement).name);
  if (!field) return;

  emits('update', {
    ...field,
    value: (ev.target as HTMLInputElement).value,
  });

  // validate field rules
  validaterules(field);
};

const submit = () => {
  props.fields.forEach((field) => {
    validaterules(field);
  });

  const error = props.fields.filter((field) => field.error).length > 0;
  if (error) {
    store.commit('toast/setToast', {
      message: 'Por favor, verifica los campos marcados en rojo',
      type: 'error',
    });
    return;
  }
  emits('submit', props.fields);
};

const getFilteredOptions = (fieldName: string, query: string | undefined) => {
  if (!query) return [];
  const field = props.fields.find((f) => f.name === fieldName);
  if (!field) return [];

  const options = field.options?.map((option) => option.label);
  if (!options) return [];

  const filtered = options
    .filter((opts) => opts.toLowerCase()
      .includes(query.toLowerCase()));

  return filtered;
};

const updateQuery = (ev: Event) => {
  const field = props.fields.find((f) => f.name === (ev.target as HTMLInputElement).name);
  if (!field) return;

  emits('updateQuery', {
    ...field,
    query: (ev.target as HTMLInputElement).value,
  });

  validaterules(field);
};

const setSelectSearchOption = (
  fieldName: string,
  option: FormOptionsI,
) => {
  const field = props.fields.find((f) => f.name === fieldName);
  if (!field) return;
  emits('update', {
    ...field,
    value: option.value,
    query: option.label,
  });

  validaterules(field);
};

const dateTimeUnixToInput = (unix: string | number | boolean | null) => {
  const date = moment.unix(Number(unix));
  return date.format('YYYY-MM-DDTHH:mm');
};

</script>
