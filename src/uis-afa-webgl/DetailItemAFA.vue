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
      api: false,
      mounter: new THREE.Object3D()
    }
  },
  watch: {
    ui () {
      this.engine.scene.userData._id = this.ui.id
      this.cleanUp()
      this.setup()
    }
  },
  beforeDestroy () {
    this.cleanUp()
  },
  methods: {
    cleanUp () {
      this.engine.execStack.detialART = () => {}
      if (this.mounter) {
        this.engine.scene.remove(this.mounter)
      }
      this.mounter = new THREE.Object3D()
      this.engine.scene.add(this.mounter)
    },
    async setup () {
      this.api = await API.setupGraphics({ ui: this.ui, mounter: this.mounter, scene: this.engine.scene, camera: this.engine.camera })
      // this.engine.scene.userData._id = this.ui._id

      this.engine.execStack.detialART = () => {
        this.api.render({
        })
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
