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
      to="/app/courses"
      class="text-2xl font-semibold text-orange-900"
    >
      Cursos
    </router-link>
    <router-link
      v-validate-perm
      data-perm="courses/add"
      to="/app/courses/add"
      class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
    >
      <i class="fas fa-plus"></i>
      Agregar cursos
    </router-link>
  </div>
  <router-view></router-view>
</template>
