import * as THREE from 'three'

export const practices = [
  {
    _id: '1',
    day: '01',
    name: 'Flower Algo',
    component: () => import('../practices/d01/FlowerAlgorithm.vue')
  },
  {
    _id: '2',
    day: '02',
    name: 'Wave GeoShader',
    component: () => import('../practices/d02/PlaneWaveAnimation.vue')
  },
  {
    _id: '3',
    day: '03',
    name: 'Emoji Lab',
    component: () => import('../practices/d03/Emoji.vue')
  },
  {
    _id: '4',
    day: '04',
    name: 'Ball',
    component: () => import('../practices/d04-ball/BallAnimation.vue')
  },
  {
    _id: '5',
    day: '05',
    name: 'Hill',
    component: () => import('../practices/d05-hill/GeoShadeAnimation.vue')
  },
  {
    _id: '6',
    day: '06',
    name: 'Particles',
    component: () => import('../practices/d06-particle-engine/ParticlePage.vue')
  }
]

export const wait = () => {
  return new Promise((resolve) => setTimeout(resolve, 0))
}

export const loadGLB = () => {

}

export const setupGraphics = async ({ ui, mounter, scene, camera }) => {
  await wait()
  let api = {}
  let seed = ui.seed
  let geotype = ui.geotype || 'box'

  let geometry = false

  if (geotype === 'box') {
    geometry = new THREE.BoxBufferGeometry(8.0, 8.0, 8.0, 20, 20, 20)
  } else if (geotype === 'cylinder') {
    geometry = new THREE.CylinderGeometry(5.0, 5.0, 10.0, 32, 32, false)
  } else if (geotype === 'torusknot') {
    geometry = new THREE.TorusKnotBufferGeometry(5.0, 0.4, 256, 256, 4.0)
  } else if (geotype === 'sphere') {
    geometry = new THREE.SphereBufferGeometry(6.0, 128, 128)
  }

  let color = new THREE.Color().setHSL(seed, 1, 0.75)

  await wait()

  // var material = new THREE.MeshStandardMaterial({
  //   color,
  //   roughness: 0.5,
  //   metalness: 0.05,
  //   flatShading: false
  // })

  let uniforms = {
    time: {
      value: 0
    }
  }

  let material = new THREE.ShaderMaterial({
    vertexShader: `
    uniform float time;
    void main (void) {
      vec3 nPos = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(nPos, 1.0);
    }
  `,
    fragmentShader: `
    void main (void) {
      gl_FragColor = vec4(vec3(1.0, 0.0, 1.0), 0.5);
    }
    `,
    // depthTest: true,
    uniforms,
    transparent: true
  })

  let mesh = new THREE.Mesh(geometry, material)
  api.getObject = () => mesh
  scene.background = color.clone().offsetHSL(0.05, 0.0, 0.2)

  api.render = ({ parallax = undefined }) => {
    // camera.position.y = ((renderer.domElement.clientHeight - bottom) / (renderer.domElement.clientHeight)) * 5.0
    // if (typeof parallax !== 'undefined') {
    //   mesh.rotation.y = parallax * Math.PI * 0.5
    // }
    uniforms.time.value = window.performance.now() * 0.001

    if (!parallax) {
      if (geotype === 'cylinder') {
        mesh.rotation.x += 0.005
      }
    }

    mesh.rotation.y += 0.005
  }

  camera.position.z = 16

  let light2 = new THREE.HemisphereLight(0xaaaaaa, 0x444444)
  mounter.add(light2)

  var light = new THREE.DirectionalLight(0xffffff, 0.5)
  light.position.set(1, 1, 1)
  mounter.add(light)

  mounter.add(mesh)
  return api
}
