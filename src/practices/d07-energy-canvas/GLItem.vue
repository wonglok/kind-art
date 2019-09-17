<template>
  <div>
  </div>
</template>

<script>
import _ from 'lodash'
let THREE = {
  ...require('three'),
  ...require('three/examples/jsm/controls/OrbitControls.js')
}
let wAPI = require('../../apis/wAPI.js')

export default {
  props: {
    APIs: {},
    domID: {},
    li: {}
  },
  data () {
    return {
      myAPI: {
        scene: false,
        render () {}
      }
    }
  },
  beforeDestroy  () {
    delete this.APIs[this.domID]
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
    let nav = document.createElement('div')
    if (document.getElementById('navrect')) {
      nav = await this.getDOM({ domID: 'navrect' })
    }
    let rect = dom.getBoundingClientRect()
    let scene = this.myAPI.scene = new THREE.Scene()
    let fov = 75
    let aspect = rect.width / rect.height
    let near = 0.1
    let far = 100000000

    let camera = this.myAPI.camera = new THREE.PerspectiveCamera(fov, aspect, near, far)

    camera.position.z = 50

    // var controls = new THREE.OrbitControls(camera, dom)
    // controls.minDistance = 0
    // controls.maxDistance = 16
    // controls.enablePan = false
    // controls.enableZoom = false

    scene.background = new THREE.Color().setHSL(Math.random(), 0.5, 0.95)

    let uniforms = {
      twist: {
        value: new THREE.Vector3(0, 0, 0)
      },
      iResolution: {
        value: new THREE.Vector3(rect.width, rect.height, 1)
      },
      time: {
        value: 0
      },
      parallax: {
        value: 0
      },
      color: {
        value: new THREE.Color().setHSL(Math.random(), 0.5, 0.55)
      }
    }

    let setMat = () => {
      let mat = new THREE.ShaderMaterial({
        vertexShader: `
        #include <common>

        mat3 rotateX(float rad) {
            float c = cos(rad);
            float s = sin(rad);
            return mat3(
                1.0, 0.0, 0.0,
                0.0, c, s,
                0.0, -s, c
            );
        }

        mat3 rotateY(float rad) {
          float c = cos(rad);
          float s = sin(rad);
          return mat3(
              c, 0.0, -s,
              0.0, 1.0, 0.0,
              s, 0.0, c
          );
        }

        mat3 rotateZ(float rad) {
          float c = cos(rad);
          float s = sin(rad);
          return mat3(
              c, s, 0.0,
              -s, c, 0.0,
              0.0, 0.0, 1.0
          );
        }

        uniform float time;
        uniform vec3 twist;
        varying vec3 vNormal;
        varying vec2 vUv;

        void main (void) {
          vec2 vUv = uv;
          vec3 nPos = position;

          nPos = nPos * rotateX(nPos.x * twist.x);
          nPos = nPos * rotateY(nPos.y * twist.y);
          nPos = nPos * rotateZ(nPos.z * twist.z);

          vNormal = (normalMatrix * normal);

          vNormal = vNormal * rotateX(vNormal.x + twist.x);
          vNormal = vNormal * rotateX(vNormal.y + twist.y);
          vNormal = vNormal * rotateX(vNormal.z + twist.z);

          gl_Position = projectionMatrix * modelViewMatrix * vec4(nPos, 1.0);
        }
      `,
        fragmentShader: `
        varying vec3 vNormal;
        varying vec2 vUv;

        mat3 rotateX(float rad) {
            float c = cos(rad);
            float s = sin(rad);
            return mat3(
                1.0, 0.0, 0.0,
                0.0, c, s,
                0.0, -s, c
            );
        }

        mat3 rotateY(float rad) {
          float c = cos(rad);
          float s = sin(rad);
          return mat3(
              c, 0.0, -s,
              0.0, 1.0, 0.0,
              s, 0.0, c
          );
        }

        mat3 rotateZ(float rad) {
          float c = cos(rad);
          float s = sin(rad);
          return mat3(
              c, s, 0.0,
              -s, c, 0.0,
              0.0, 0.0, 1.0
          );
        }

        uniform vec3 iResolution;
        uniform vec3 color;
        uniform float time;
        uniform float parallax;
        void main (void) {
          vec2 st = gl_FragCoord.xy / iResolution.xy;

          vec3 color1 = vec3(1.0,0.55,0);
          vec3 color2 = vec3(0.226,0.000,0.615);

          float mixValue = distance(st, vec2(0.0,0.8));

          vec3 color = mix(color1,color2,mixValue);

          gl_FragColor = vec4(abs(color * rotateZ((parallax * 0.33 + time * 4.0))) * 0.7,1.0);
        }
        `,

        side: THREE.DoubleSide,
        uniforms,
        transparent: true
      })
      mesh.material = mat
    }
    let setGeo = () => {
      let rect = dom.getBoundingClientRect()
      let sInfo = wAPI.calcScreen({ zPos: 0, camera, rect })
      let geo = new THREE.PlaneBufferGeometry(sInfo.width * 1.0, sInfo.height * 1.0, 100, 100 / sInfo.aspect)
      mesh.geometry = geo
      mesh.geometry.needsUpdate = true

      // uniforms.iResolution.value.x = rect.width
      // uniforms.iResolution.value.y = rect.height
      uniforms.iResolution.value.x = window.innerWidth
      uniforms.iResolution.value.y = window.innerHeight
      uniforms.iResolution.value.z = camera.position.z
    }
    let mesh = new THREE.Mesh()
    setGeo()
    setMat()

    scene.add(mesh)

    window.addEventListener('resize', () => {
      let size = dom.getBoundingClientRect()
      camera.aspect = size.width / size.height
      camera.updateProjectionMatrix()
    })

    window.addEventListener('resize', _.debounce(() => {
      setGeo()
    }, 100))

    this.myAPI.render = async ({ renderer }) => {
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

      // camera.position.y =  * 25

      uniforms.time.value = window.performance.now() * 0.0001
      uniforms.parallax.value = (parallax - 0.5) * Math.PI * 2.0

      renderer.setViewport(left, bottom, width, height)
      renderer.setScissor(left, bottom, width, height)

      renderer.render(scene, camera)
    }

    this.APIs[this.domID] = this.myAPI
  }
}
</script>

<style>

</style>
