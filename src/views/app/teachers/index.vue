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
    <h1 class="text-2xl font-semibold text-purple-900"> Docentes </h1>
    <router-link
      to="/app/teachers/find"
      class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
    >
      <i class="fas fa-plus"></i>
      Agregar docente
    </router-link>
  </div>
  <router-view></router-view>
</template>
