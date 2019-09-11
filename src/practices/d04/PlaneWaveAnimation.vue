<template>
  <div class="full relative">
    <Engine :toucher="toucher" v-if="toucher" @ready="engine = $event; setup()"></Engine>
    <div class="full absolute top-0 left-0" ref="toucher"></div>
    <PlaneWave v-if="engine" :scene="engine.scene" :engine="engine"></PlaneWave>
  </div>
</template>

<script>
export default {
  components: {
    PlaneWave: require('./PlaneWave.vue').default,
    Engine: require('./Engine.vue').default
  },
  data () {
    return {
      toucher: false,
      engine: false
    }
  },
  activated () {
    this.engine.start()
  },
  deactivated () {
    this.engine.stop()
  },
  mounted () {
    this.toucher = this.$refs['toucher']
  },
  methods: {
    setup () {
      // let q = {
      //   x: 0.43573198127488558,
      //   y: 0.16011900217765562,
      //   z: 0.1021540419652715823,
      //   w: -0.7952909424915914
      // }
      // this.engine.scene.setRotationFromQuaternion(q)
    }
  }
}
</script>

<style>

</style>
