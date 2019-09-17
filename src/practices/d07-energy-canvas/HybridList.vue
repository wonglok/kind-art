<template>
  <div class="relative full" v-if="list && APIs">
    <div class="absolute top-0 left-0 w-full h-full">
      <EngineScissor :APIs="APIs" class="full"></EngineScissor>
    </div>
    <div class="absolute top-0 left-0 w-full h-full">
      <div :key="li._id + 'webgl'" v-for="li in list">
        <GLItem v-if="getDomID(li)" :domID="getDomID(li)" :li="li" :APIs="APIs">
        </GLItem>
      </div>
    </div>
    <div class="absolute top-0 left-0 h-full w-full scrolling-touch overflow-y-auto" ref="scroller">
      <DOMItem :map="map" :key="li._id + 'dom'" @select="$emit('select', $event)" :li="li" v-for="li in list">
      </DOMItem>
      <div class=" cursor-pointer select-none h-32 lg:h-56 border-gray-700 w-full border-b flex items-center justify-center" @click="$emit('loadmore')">
        Load More...
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    APIs: {},
    list: {}
  },
  components: {
    DOMItem: require('./DOMItem.vue').default,
    EngineScissor: require('./EngineScissor.vue').default,
    GLItem: require('./GLItem.vue').default
  },
  watch: {
    list () {
      this.$forceUpdate()
    }
  },
  data () {
    return {
      map: new Map()
    }
  },
  mounted () {
    window.addEventListener('scroll-to-bottom', () => {
      this.$nextTick(() => {
        if (this.$refs['scroller']) {
          this.$refs['scroller'].scrollTop = this.$refs['scroller'].scrollHeight
        }
      })
    }, false)
  },
  methods: {
    getDomID (li) {
      return this.map.get(li._id)
    }
  }
}
</script>

<style>

</style>
