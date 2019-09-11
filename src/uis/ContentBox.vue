<template>
  <div class="fuller">
    <div class="block h-full md:hidden scrolling-touch overflow-y-auto">
      <PracticeList @item="goItem"></PracticeList>
    </div>
    <div class="flex h-full w-full flex flex-row justify-between">
      <div class="h-full w-56 xl:w-64 border-r border-gray-600 scrolling-touch overflow-y-auto">
        <PracticeList @item="item = $event"></PracticeList>
      </div>
      <div class="h-full w-fuller">
        <ContentArea v-if="item" :item="item"></ContentArea>
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
    ContentArea: require('./ContentArea.vue').default,
    PracticeList: require('./PracticeList.vue').default
  },
  data () {
    return {
      item: false
    }
  },
  async mounted () {
    this.item = API.practices[0]
  },
  methods: {
    goItem (item) {
      this.$router.push(`/practices/${item._id}`)
    }
  }
}
</script>

<style scoped>
.fuller{
  height: calc(100% - 5rem);
}
.w-fuller{
  width: calc(100% - 16rem * 2.0);
}
</style>
