<template>
  <div>
  </div>
</template>

<script>
let THREE = {
  ...require('three'),
  ...require('three/examples/jsm/controls/OrbitControls.js')
}
let API = require('../apis/api')

export default {
  props: {
    scenes: {},
    domID: {},
    ui: {}
  },
  data () {
    return {
      wrapper: {
        scene: false,
        render () {}
      }
    }
  },
  beforeDestroy  () {
    delete this.scenes[this.domID]
  },
  methods: {
    getDOM ({ domID }) {
      return new Promise((resolve) => {
        let intv = setInterval(() => {
          let item = document.getElementById(domID)
          if (item) {
            resolve(item)
            clearInterval(intv)
          }
        }, 0)
      })
    }
  },
  async mounted () {
    let dom = await this.getDOM({ domID: this.domID })
    let nav = await this.getDOM({ domID: 'navrect' })
    let rect = dom.getBoundingClientRect()
    let scene = this.wrapper.scene = new THREE.Scene()
    let fov = 75
    let aspect = rect.width / rect.height
    let near = 0.1
    let far = 100000000

    let camera = this.wrapper.camera = new THREE.PerspectiveCamera(fov, aspect, near, far)

    // var controls = new THREE.OrbitControls(camera, dom)
    // controls.minDistance = 0
    // controls.maxDistance = 16
    // controls.enablePan = false
    // controls.enableZoom = false

    // scene.background = new THREE.Color('rgb(192,223,255)')

    let glAPI = await API.setupGraphics({ ui: this.ui, scene, camera, mounter: scene })
    this.wrapper.glAPI = glAPI

    window.addEventListener('resize', () => {
      let size = dom.getBoundingClientRect()
      camera.aspect = size.width / size.height
      camera.updateProjectionMatrix()
    })

    this.wrapper.render = async ({ renderer }) => {
      // console.log('123')
      // controls.update()
      // scene.children[0].rotation.y += 0.01
      let rect = dom.getBoundingClientRect()
      let navrect = nav.getBoundingClientRect()

      if (rect.bottom < 0 || rect.top > (renderer.domElement.clientHeight + navrect.height) ||
          rect.right < 0 || rect.left > renderer.domElement.clientWidth) {
        return // it's off screen
      }

      var width = rect.right - rect.left
      var height = rect.bottom - rect.top
      var left = rect.left
      var bottom = renderer.domElement.clientHeight - rect.bottom + navrect.height
      var parallax = (renderer.domElement.clientHeight - bottom + height * 0.5) / (renderer.domElement.clientHeight)
      glAPI.render({ parallax })

      //
      renderer.setViewport(left, bottom, width, height)
      renderer.setScissor(left, bottom, width, height)

      renderer.render(scene, camera)
    }

    this.scenes[this.domID] = this.wrapper
  }
}
</script>

<style>

</style>
