<template>
  <!-- <input
    class="appearance-none rounded-md p-2 focus:outline-none focus:shadow-outline bg-zinc-800 focus:ring-2 ring-red-500"
    type="text"
    id="username"
    placeholder="Placeholder"
  /> -->
  <!-- <input
    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="username"
    type="text"
    placeholder="Username"
  /> -->
  <div class="py-6"></div>
  <div class="w-56 relative group">
    <input
      type="text"
      id="username"
      required
      class="w-full bg-zinc-800 h-10 px-4 text-sm peer outline-none focus:ring-2 ring-red-500 appearance-none rounded-md"
    />
    <label
      for="username"
      class="transform transition-all ease-in-out absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:pb-2 group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full cursor-text"
      >Username</label
    >
  </div>
</template>

<script setup></script>
