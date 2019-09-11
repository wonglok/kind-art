<template>
  <div>
  </div>
</template>

<script>
// import * as THREE from 'three'
let GLAPI = require('../../graphics-simulation/geosim/geosim-mushroom.js')

export default {
  props: {
    scene: {},
    engine: {}
  },
  data () {
    return {
      api: {}
    }
  },
  mounted () {
    this.setup()
  },
  methods: {
    async setup () {
      this.api = GLAPI.makeAPI({ renderer: this.engine.renderer, scene: this.scene })
      this.engine.camera.position.x = 0
      this.engine.camera.position.z = -500
      this.engine.camera.position.y = 500

      // this.api.mesh.rotation.x = Math.PI * 0.05

      this.engine.execMap.renderActiveLearningART = () => {
        this.api.render()
      }
    }
  },
  beforeDestroy () {
    this.api.clean()
    this.engine.execMap.renderActiveLearningART = () => {}
  }
}
</script>

<style>

</style>
