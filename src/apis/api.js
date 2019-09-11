export const practices = [
  {
    _id: '1',
    day: '01',
    name: 'Flower Algorithm',
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
    name: 'Terrian',
    component: () => import('../practices/d05/BallAnimation.vue')
  },
  {
    _id: '5',
    day: '05',
    name: 'Ball',
    component: () => import('../practices/d04/GeoShadeAnimation.vue')
  }

  // {
  //   _id: '6',
  //   day: '06',
  //   name: 'Mushroom',
  //   component: () => import('../practices/d06/GeoShadeAnimation.vue')
  // },
  // {
  //   _id: '7',
  //   name: 'Sculpture',
  //   component: () => import('../practices/d07/GeoShadeAnimation.vue')
  // }
]
