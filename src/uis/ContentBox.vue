<template>
  <div class="fuller">
    <div class="block h-full md:hidden scrolling-touch overflow-y-auto">
      <PracticeList @item="goItem"></PracticeList>
    </div>
    <div class="hidden sm:hidden md:flex h-full w-full flex flex-row justify-between">
      <div class="h-full w-56 xl:w-64 border-r border-gray-600 scrolling-touch overflow-y-auto">
        <PracticeList @item="goIFrame"></PracticeList>
      </div>
      <div class="h-full w-fuller">
        <iframe class="border-none outline-none h-full w-full" border="0" ref="frame"></iframe>
        <!-- <ContentArea v-if="item" :item="item"></ContentArea> -->
      </div>
      <CTAList></CTAList>
    </div>
  </div>
</template>

<script>
import * as API from '../apis/api'
export default {
  components: {
    CTAList: require('./CTAList.vue').default,
    // ContentArea: require('./ContentArea.vue').default,
    PracticeList: require('./PracticeList.vue').default
  },
  data () {
    return {
      item: false
    }
  },
  async mounted () {
    if (window.innerWidth >= 768) {
      this.item = API.practices[API.practices.length - 1]
      this.goIFrame(this.item)
    }
  },
  methods: {
    goItem (item) {
      window.location.assign(`/practices/${item._id}`)
    },
    goIFrame (item) {
      this.$refs['frame'].src = `/practices-embed/${item._id}`
    }
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
