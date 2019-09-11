<template>
  <div class="h-full w-56 xl:w-64 border-l border-gray-600 scrolling-touch overflow-y-auto">
    <div class="text-xl font-serif border-b border-gray-600 py-6 text-center select-none hover:bg-gray-200 cursor-pointer flex items-center justify-center h-64" @click="bamboozo">
      Click Bait.
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    bamboozo () {
      window.alert(`You've been bamboozled!`)
    }
  }
}
</script>

<style>

</style>
