<template>
  <div></div>
</template>

<script>
import * as API from '../apis/api'
import * as THREE from 'three'
export default {
  props: {
    ui: {},
    engine: {}
  },
  components: {
  },
  data () {
    return {
      mounter: new THREE.Object3D()
    }
  },
  watch: {
    ui () {
      this.cleanUp()
      this.setup()
    }
  },
  beforeDestroy () {
    this.cleanUp()
    this.engine.execStack.detialART = () => {}
  },
  methods: {
    cleanUp () {
      if (this.mounter) {
        this.engine.scene.remove(this.mounter)
      }
      this.mounter = new THREE.Object3D()
      this.engine.scene.add(this.mounter)
    },
    async setup () {
      let api = await API.setupGraphics({ ui: this.ui, mounter: this.mounter, scene: this.engine.scene, camera: this.engine.camera })
      this.engine.execStack.detialART = () => {
        api.render({})
      }
    }
  },
  mounted () {
    this.cleanUp()
    this.setup()
  }
}
</script>

<style>

</style>
