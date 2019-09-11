<template>
  <div class="fuller">
    <div class="block h-full md:hidden scrolling-touch overflow-y-scroll">
      <PracticeList></PracticeList>
    </div>
    <div class="hidden md:flex h-full w-full flex flex-row justify-between">
      <div class="h-full w-56 xl:w-64 border-r border-gray-600 scrolling-touch overflow-y-scroll">
        <PracticeList></PracticeList>
      </div>
      <div class="h-full ">
        OMG
      </div>
      <div class="h-full w-56 xl:w-64 border-l border-gray-600 scrolling-touch overflow-y-scroll">
        <div class=" border-b border-gray-600 py-6 text-center">
          123
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    PracticeList: require('./PracticeList.vue').default
  }
}
</script>

<style scoped>
.fuller{
  height: calc(100% - 5rem);
}
</style>
