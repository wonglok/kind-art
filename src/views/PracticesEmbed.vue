<template>
  <div class="bg-gray-400 font-serif full">
    <component class="full" v-if="item.component" :item="item" :is="item.component"></component>
  </div>
</template>

<script>
import * as API from '../apis/api'
export default {
  components: {
    // HeaderNav: require('../uis/HeaderNav.vue').default
  },
  computed: {
    item () {
      return this.getItem()
    }
  },
  methods: {
    getItem () {
      return API.practices.find(p => p._id === this.$route.params.pid)
    }
  }
}
</script>

<style scoped>
.fuller{
  height: calc(100% - 5rem);
}
</style>
