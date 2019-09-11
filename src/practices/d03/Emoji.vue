<template>
  <div class="full" ref="toucher">
    <Engine :bloom="'default'" :toucher="toucher" v-if="toucher" @ready="engine = $event; setup()"></Engine>
  </div>
</template>

<script>

var THREE = {
  ...require('three'),
  ...require('three/examples/jsm/loaders/GLTFLoader.js')
}
var NProgress = require('nprogress')
require('nprogress/nprogress.css')

export default {
  components: {
    Engine: require('./Engine.vue').default
    // Viewer: require('../../graphics/Viewer.vue').default
  },
  data () {
    return {
      mounter: new THREE.Object3D(),
      engine: false,
      toucher: false
    }
  },
  mounted () {
    this.toucher = this.$refs['toucher']
  },
  methods: {
    setup () {
      this.engine.scene.background = new THREE.Color('#718096')
      // eslint-disable-next-line
      this.loadGLTF({ file: require('file-loader!../../graphics/model/glb/hands/writting.glb') })
    },
    getArrayBuffer (item) {
      return new Promise(async (resolve) => {
        let download = () => {
          let loader = new THREE.FileLoader()
          loader.setResponseType('arraybuffer')
          loader.load(item.file, async (data) => {
            resolve(data)
          })
        }
        download()
      })
    },
    async loadGLTF (item) {
      this.engine.camera.position.z = 50
      var loader = new THREE.GLTFLoader()
      this.loader = loader
      NProgress.start()

      let arraybuffer = await this.getArrayBuffer(item)
      // console.log(arraybuffer)
      // eslint-disable-next-line
      this.loader.parse(arraybuffer, '/', (obj) => {
        // // eslint-disable-next-line
        // this.loader.load(item.file, (obj) => {
        NProgress.done()
        let group = new THREE.Object3D()
        console.log(obj)
        group.add(obj.scene)
        obj.scene.scale.multiplyScalar(40)

        var light = new THREE.PointLight(0xffffff, 13, 156)
        light.position.set(0, 60, 125)
        var light2 = new THREE.PointLight(0xffffff, 13, 156)
        light2.position.set(0, 60, -125)

        group.add(light)
        group.add(light2)

        // group.rotation.x = item.rotation.x
        // group.rotation.y = item.rotation.y
        // group.rotation.z = item.rotation.z

        // args.position = new THREE.Vector3()

        // group.position.x = item.position.x
        // group.position.y = item.position.y
        // group.position.z = item.position.z

        if (this.mounter) {
          this.engine.scene.remove(this.mounter)
          this.mounter = new THREE.Object3D()
          this.mounter.add(group)
          this.engine.scene.add(this.mounter)
        }

        // this.setup({ obj: obj.children[0] })
      })
    }
  }
}
</script>

<style>

</style>
