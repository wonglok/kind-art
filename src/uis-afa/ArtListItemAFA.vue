<template>
  <div>
  </div>
</template>

<script>
let THREE = {
  ...require('three'),
  ...require('three/examples/jsm/controls/OrbitControls.js')
}

export default {
  props: {
    scenes: {},
    domID: {},
    ui: {}
  },
  data () {
    return {
      api: {
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
    let scene = this.api.scene = new THREE.Scene()
    let fov = 75
    let aspect = rect.width / rect.height
    let near = 0.1
    let far = 100000000

    let camera = this.api.camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.z = 16
    var controls = new THREE.OrbitControls(camera, dom)
    controls.minDistance = 0
    controls.maxDistance = 16
    controls.enablePan = false
    controls.enableZoom = false

    let geometry = new THREE.DodecahedronBufferGeometry(6.5)
    var material = new THREE.MeshStandardMaterial({
      color: new THREE.Color().setHSL(Math.random(), 1, 0.75),
      roughness: 0.5,
      metalness: 0,
      flatShading: true
    })
    scene.add(new THREE.Mesh(geometry, material))
    scene.add(new THREE.HemisphereLight(0xaaaaaa, 0x444444))
    var light = new THREE.DirectionalLight(0xffffff, 0.5)
    light.position.set(1, 1, 1)
    scene.add(light)

    window.addEventListener('resize', () => {
      let size = dom.getBoundingClientRect()
      camera.aspect = size.width / size.height
      camera.updateProjectionMatrix()
    })
    scene.background = new THREE.Color('rgb(192,223,255)')

    this.api.render = async ({ renderer }) => {
      // console.log('123')
      controls.update()
      scene.children[0].rotation.y += 0.01
      let rect = dom.getBoundingClientRect()
      let navrect = nav.getBoundingClientRect()

      if (rect.bottom < 0 || rect.top > renderer.domElement.clientHeight ||
          rect.right < 0 || rect.left > renderer.domElement.clientWidth) {
        return // it's off screen
      }

      var width = rect.right - rect.left
      var height = rect.bottom - rect.top
      var left = rect.left
      var bottom = renderer.domElement.clientHeight - rect.bottom + navrect.height

      //
      renderer.setViewport(left, bottom, width, height)
      renderer.setScissor(left, bottom, width, height)

      renderer.render(scene, camera)
    }

    this.scenes[this.domID] = this.api
  }
}
</script>

<style>

</style>
