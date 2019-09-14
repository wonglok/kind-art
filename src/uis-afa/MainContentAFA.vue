<template>
  <div class="full relative">
    <Engine :bloom="'baloon'" :toucher="toucher" v-if="true || toucher" ref="engine" @ready="engine = $event; setup()"></Engine>
    <!-- <div class="full absolute top-0 left-0" ref="toucher">
    </div> -->
    <DetailItemAFA v-if="engine && ui" :ui="ui" :engine="engine"></DetailItemAFA>
  </div>
</template>

<script>
export default {
  props: {
    uis: {},
    currentID: {}
  },
  components: {
    Engine: require('../uis-afa-webgl/Engine.vue').default,
    DetailItemAFA: require('../uis-afa-webgl/DetailItemAFA.vue').default
  },
  computed: {
    ui () {
      return this.uis.find(e => e._id === this.currentID)
    }
  },
  data () {
    return {
      toucher: false,
      engine: false
    }
  },
  // activated () {
  //   this.engine.start()
  // },
  // deactivated () {
  //   this.engine.stop()
  // },
  mounted () {
    this.toucher = this.$refs['toucher']
  },
  methods: {
    setup () {

    }
  }
}
</script>

<style>

</style>
