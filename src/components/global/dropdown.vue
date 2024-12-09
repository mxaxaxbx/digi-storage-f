<template>
  <div v-click-outside="closeOnClickOutside">
    <button
      @click="showMenu = !showMenu"
      id="dropdownDefaultButton"
      data-dropdown-toggle="dropdown"
      class="
        w-10 h-10
        bg-gray-200
        border border-gray-500
        rounded-full
        p-1
      "
      type="button"
    >
      <!-- initial of user -->
      <span v-html="props.content"></span>
    </button>

    <!-- Dropdown user menu -->
    <div
      id="dropdown"
      v-show="showMenu"
      class="
        border-2 border-gray-200
        p-1
        z-10
        absolute
        right-0
        bg-white
        divide-y divide-gray-100
        rounded-lg shadow w-44
      "
    >
      <ul
        class="py-2 text-sm text-gray-700"
        aria-labelledby="dropdownDefaultButton"
      >
        <li
          v-for="option, k in props.options"
          :key="k"
          class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          role="button"
        >
          <button
            @click="emit('action', option.action); showMenu = false"
            class="w-full"
          >
            {{ option.content }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, defineEmits } from 'vue';

const showMenu = ref(false);

interface Options {
  content: string;
  action: string;
}

const emit = defineEmits(['action']);

const props = defineProps<{
  content: {
    type: string;
    required: true;
  };
  options: {
    type: Options[];
    required: true;
  };
}>();

function closeOnClickOutside() {
  showMenu.value = false;
}
</script>
