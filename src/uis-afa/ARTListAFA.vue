<template>
  <div class="relative full" v-if="uis && scenes">
    <div class="absolute top-0 left-0 w-full h-full">
      <ArtListEngineAFA :scenes="scenes" class="full"></ArtListEngineAFA>
    </div>
    <div class="absolute top-0 left-0 w-full h-full">
      <div :key="ui._id + 'webgl'" v-for="ui in uis">
        <ArtListItemAFA v-if="ui.domID" :domID="ui.domID" :ui="ui" :scenes="scenes">
        </ArtListItemAFA>
      </div>
    </div>
    <div class="absolute top-0 left-0 h-full w-full scrolling-touch overflow-y-auto">
      <ArtListDOMItemAFA :key="ui._id + 'dom'" @select="$emit('select', $event)" :ui="ui" v-for="ui in uis">
      </ArtListDOMItemAFA>
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
  data () {
    return {
    }
  }
}
</script>

<style>

</style>
