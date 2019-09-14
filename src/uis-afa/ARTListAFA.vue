<template>
  <div class="relative full" v-if="uis && scenes">
    <div class="absolute top-0 left-0 w-full h-full">
      <ArtListEngineAFA :scenes="scenes" class="full"></ArtListEngineAFA>
    </div>
    <div class="absolute top-0 left-0 w-full h-full">
      <div :key="ui._id + 'webgl'" v-for="ui in uis">
        <ArtListItemAFA v-if="getDomID(ui)" :domID="getDomID(ui)" :ui="ui" :scenes="scenes">
        </ArtListItemAFA>
      </div>
    </div>
    <div class="absolute top-0 left-0 h-full w-full scrolling-touch overflow-y-auto" ref="scroller">
      <ArtListDOMItemAFA :map="map" :key="ui._id + 'dom'" @select="$emit('select', $event)" :ui="ui" v-for="ui in uis">
      </ArtListDOMItemAFA>
      <!-- <div class=" cursor-pointer select-none h-32 lg:h-56 border-gray-700 w-full border-b flex items-center justify-center" @click="$emit('loadmore')">
        Load More...
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    scenes: {},
    uis: {}
  },
  components: {
    ArtListDOMItemAFA: require('./ArtListDOMItemAFA.vue').default,
    ArtListEngineAFA: require('./ArtListEngineAFA.vue').default,
    ArtListItemAFA: require('./ArtListItemAFA.vue').default
  },
  watch: {
    uis () {
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
    getDomID (ui) {
      return this.map.get(ui._id)
    }
  }
}
</script>

<style>

</style>
