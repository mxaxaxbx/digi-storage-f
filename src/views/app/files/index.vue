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
    <router-link
      v-validate-perm
      data-perm="courses/add"
      to="/app/courses/add"
      class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
    >
      <!-- upload file icon -->
      <i class="fas fa-upload"></i>
      Subir Archivo
    </router-link>
  </div>
  <router-view></router-view>
</template>
