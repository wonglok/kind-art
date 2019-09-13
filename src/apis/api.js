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

export const setupGraphics = async ({ ui, scene }) => {
  let api = {}

  let geometry = false
  if (Math.random() <= 0.25) {
    geometry = new THREE.BoxBufferGeometry(8.0, 8.0, 8.0, 20, 20, 20)
  } else {
    geometry = new THREE.TorusKnotBufferGeometry(5.0, 0.4, 230, 230, 4.0)
  }
  let color = new THREE.Color().setHSL(Math.random(), 1, 0.75)
  var material = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.5,
    metalness: 0.05,
    flatShading: false
  })
  let mesh = new THREE.Mesh(geometry, material)
  scene.background = color.clone().offsetHSL(0.05, 0.0, 0.2)

  api.animate = ({ bottom, renderer }) => {
    mesh.rotation.x = bottom / (renderer.domElement.clientHeight * 0.5) * Math.PI
  }

  api.getObject = () => mesh

  scene.add(mesh)

  return api
}
