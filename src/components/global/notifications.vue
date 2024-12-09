<template>
  <div
    class="
      fixed
      top-0
      px-5
      right-0
      z-50
      w-96
      bg-white bg-opacity-90
    "
  >
    <div
      v-for="(notification, index) in notifications"
      :key="index"
      class="
        mt-2
        p-2
        border-l-4
        shadow
        mb-2
      "
      :class="{
        'border-red-500 bg-red-100': notification.type === 'error',
        'border-green-500 bg-green-100': notification.type === 'success',
        'border-blue-500 bg-blue-100': notification.type === 'info',
        'border-yellow-500 bg-yellow-100': notification.type === 'warning',
      }"
    >
      <div class="flex justify-between">
        <div class="flex items-center">
          <div class="mr-2">
            <i class="fas fa-bell" />
          </div>
          <div>
            <p class="font-semibold">{{ notification.title }}</p>
            <p>{{ notification.message }}</p>
          </div>
        </div>
        <div>
          <button
            @click="removeNotification(notification.id)"
            class="
              p-1
              rounded
              text-white
              bg-black
            "
          >
            <i class="fas fa-times" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
  onBeforeUnmount,
  watch,
  computed,
} from 'vue';
import { useStore } from 'vuex';
import moment from 'moment';

import { NotificationI } from '@/store/notifications/state';

const store = useStore();

const notifications = computed<NotificationI[]>(() => store.state.notifications.notifications);
// get the current date unix timestamp
const now = ref(moment().format('X'));
const interval = ref(0);

function updateNow() {
  interval.value = setInterval(() => {
    now.value = moment().format('X');
  }, 1000);
}

function removeNotification(id: string) {
  store.commit('notifications/removeNotification', id);
}

onMounted(async () => {
  updateNow();
});

// watch each second
watch(now, (newVal) => {
  if (notifications.value.length === 0) {
    return;
  }

  const notificationsReverse = [...notifications.value].reverse();

  // get the last one
  const lastNotification = notificationsReverse[notificationsReverse.length - 1];
  if (lastNotification) {
    const diff = lastNotification.closeIn - Number(newVal);
    if (diff < 0) {
      removeNotification(lastNotification.id);
    }
  }
});

onBeforeUnmount(() => {
  clearInterval(interval.value);
});

</script>
