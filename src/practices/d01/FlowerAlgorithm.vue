<template>
  <div class="full relative">
    <Engine :bloom="'default'" :toucher="toucher" v-if="toucher" @ready="engine = $event; setup()"></Engine>
    <div class="full absolute top-0 left-0" ref="toucher"></div>
    <FlowerGLSL v-if="engine" :engine="engine"></FlowerGLSL>
  </div>
</template>

<script>
export default {
  components: {
    Engine: require('./Engine.vue').default,
    FlowerGLSL: require('./FlowerGLSL.vue').default
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
