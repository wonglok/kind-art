<template>
  <div class="fuller">
    <div class="block h-full md:hidden scrolling-touch overflow-y-auto">
      123
    </div>
    <div class="hidden sm:hidden md:flex h-full w-full flex flex-row justify-between">
      <div class="h-full w-56 xl:w-64 border-r border-gray-600 scrolling-touch overflow-y-auto">
        123
      </div>
      <div class="h-full w-fuller">
        soul
        <!-- <ContentArea v-if="item" :item="item"></ContentArea> -->
      </div>
      <div class="h-full w-56 xl:w-64 border-l border-gray-600 scrolling-touch overflow-y-auto">
        123
      </div>
    </div>
  </div>
</template>

<script>
// import * as API from '../apis/api'
export default {
  components: {
  },
  data () {
    return {
    }
  },
  async mounted () {
  },
  methods: {
  }
}
</script>

<style lang="postcss" scoped>
.fuller{
  height: calc(100% - 5rem);
}

@screen md {
  .w-fuller{
    width: calc(100% - 14rem * 2.0);
  }
}
@screen xl {
  .w-fuller{
    width: calc(100% - 16rem * 2.0);
  }
}
</style>
