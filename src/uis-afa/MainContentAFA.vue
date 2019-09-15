<template>
  <div class="full relative">
    <AFAEngine :ui="ui" :bloom="'baloon'" :toucher="toucher" v-if="ui" ref="engine" @ready="engine = $event; setup()"></AFAEngine>
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
    AFAEngine: require('../uis-afa-webgl/AFAEngine.vue').default,
    DetailItemAFA: require('../uis-afa-webgl/DetailItemAFA.vue').default
  },
  computed: {
    ui () {
      return this.uis.find(e => e._id === this.currentID)
    }
  },
  watch: {
    ui () {
      this.refresher = false
      this.$nextTick(() => {
        this.refresher = true
      })
    }
  },
  data () {
    return {
      refresher: true,
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
