import * as THREE from 'three'
require('requestidlecallback')
window.setImmediate = window.setImmediate || require('set-immediate-shim')

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
  },
  {
    _id: '7',
    day: '07',
    name: 'Energy Canvas',
    component: () => import('../practices/d07-energy-canvas/EnergyCanvas.vue')
  }
]

export let getID = () => {
  return `_` + (Math.random() * 1000000000).toFixed(0)
}

export const wait = () => {
  return new Promise((resolve) => setTimeout(resolve, 0))
}

export const idle = () => {
  return new Promise((resolve) => window.requestIdleCallback(resolve, { timeout: 100 }))
}

export const immediate = () => {
  return new Promise((resolve) => window.setImmediate(resolve))
}

export const geoList = () => [
  'box',
  'sphere',
  'cylinder',
  'torusknot'
]

export const getDemo = ({ random = false } = {}) => {
  let copy = [
    {
      '_id': '_214138061',
      'doc': {
        'geotype': 'torusknot',
        'hue': '0.0761',
        'satuation': '1',
        'light': '0.4194',
        'bghue': '0.5081',
        'bgsatuation': '0.69',
        'bglight': '0.7728',
        'strength': '0.3051',
        'threshold': '0.3979',
        'radius': '1.4848',
        'matShininess': '27.7961',
        'lightDirX': '0.9745',
        'lightDirY': '1.1094',
        'lightDirZ': '1.7825',
        'rotateX': 0,
        'rotateY': 0,
        'rotateZ': 0,
        'positionX': 0,
        'positionY': 0,
        'positionZ': 0,
        'twistX': 0,
        'twistY': 0,
        'twistZ': 0
      },
      'tween': {
        'hue': false,
        'satuation': false,
        'light': false,
        'bghue': false,
        'bgsatuation': false,
        'bglight': false,
        'strength': false,
        'threshold': false,
        'radius': false,
        'matShininess': false,
        'lightDirX': false,
        'lightDirY': false,
        'lightDirZ': false,
        'rotateX': 0,
        'rotateY': 0,
        'rotateZ': 0,
        'positionX': 0,
        'positionY': 0,
        'positionZ': 0,
        'twistX': 0,
        'twistY': 0,
        'twistZ': 0
      }
    }
  ]
  let list = geoList()
  let geotype = list[Math.floor(Math.random() * list.length)]
  if (copy) {
    copy.forEach((c) => {
      c._id = getID()
      if (random) {
        c.doc.hue = Math.random()
        c.doc.bghue = Math.random()
        c.doc.geotype = geotype
      }
    })
  }
  return copy
}

export const makeRand = () => {
  let obj = {
    _id: getID(),
    ...getDemo({ random: true })[0]
  }

  return obj
}

export const SliderGroups = [
  {
    _id: getID(),
    displayName: 'Color (HSL)',
    sliders: [
      {
        _id: getID(),
        displayName: 'H',
        key: 'hue',
        min: 0,
        max: 1,
        step: 0.0001,
        multiply: 1
      },
      {
        _id: getID(),
        displayName: 'S',
        key: 'satuation',
        min: 0,
        max: 1,
        step: 0.0001,
        multiply: 1
      },
      {
        _id: getID(),
        displayName: 'L',
        key: 'light',
        min: 0,
        max: 1,
        step: 0.0001,
        multiply: 1
      }
    ]
  },
  {
    _id: getID(),
    displayName: 'Background (HSL)',
    sliders: [
      {
        _id: getID(),
        displayName: 'H',
        key: 'bghue',
        min: 0,
        max: 1,
        step: 0.0001,
        multiply: 1
      },
      {
        _id: getID(),
        displayName: 'S',
        key: 'bgsatuation',
        min: 0,
        max: 1,
        step: 0.0001,
        multiply: 1
      },
      {
        _id: getID(),
        displayName: 'L',
        key: 'bglight',
        min: 0,
        max: 1,
        step: 0.0001,
        multiply: 1
      }
    ]
  },
  {
    _id: getID(),
    displayName: 'Light Direction',
    sliders: [
      {
        _id: getID(),
        displayName: 'X',
        key: 'lightDirX',
        min: -3,
        max: 3,
        step: 0.0001,
        multiply: 3
      },
      {
        _id: getID(),
        displayName: 'Y',
        key: 'lightDirY',
        min: -3,
        max: 3,
        step: 0.0001,
        multiply: 3
      },
      {
        _id: getID(),
        displayName: 'Z',
        key: 'lightDirZ',
        min: -3,
        max: 3,
        step: 0.0001,
        multiply: 3
      }
    ]
  },
  {
    _id: getID(),
    displayName: 'Shininess',
    sliders: [
      {
        _id: getID(),
        displayName: 'S',
        key: 'matShininess',
        min: 0,
        max: 20,
        step: 0.0001,
        multiply: 1
      }
    ]
  },
  {
    _id: getID(),
    displayName: 'Twist',
    sliders: [
      {
        _id: getID(),
        displayName: 'X',
        key: 'twistX',
        min: -Math.PI * 0.5,
        max: Math.PI * 0.5,
        step: 0.0001,
        multiply: Math.PI * 0.5
      },
      {
        _id: getID(),
        displayName: 'Y',
        key: 'twistY',
        min: -Math.PI * 0.5,
        max: Math.PI * 0.5,
        step: 0.0001,
        multiply: Math.PI * 0.5
      },
      {
        _id: getID(),
        displayName: 'Z',
        key: 'twistZ',
        min: -Math.PI * 0.5,
        max: Math.PI * 0.5,
        step: 0.0001,
        multiply: Math.PI * 0.5
      }
    ]
  },
  {
    _id: getID(),
    displayName: 'Rotate',
    sliders: [
      {
        _id: getID(),
        displayName: 'X',
        key: 'rotateX',
        min: -Math.PI,
        max: Math.PI,
        step: 0.0001,
        multiply: Math.PI
      },
      {
        _id: getID(),
        displayName: 'Y',
        key: 'rotateY',
        min: -Math.PI,
        max: Math.PI,
        step: 0.0001,
        multiply: Math.PI
      },
      {
        _id: getID(),
        displayName: 'Z',
        key: 'rotateZ',
        min: -Math.PI,
        max: Math.PI,
        step: 0.0001,
        multiply: Math.PI
      }
    ]
  },
  {
    _id: getID(),
    displayName: 'Position',
    sliders: [
      {
        _id: getID(),
        displayName: 'X',
        key: 'positionX',
        min: -Math.PI,
        max: Math.PI,
        step: 0.0001,
        multiply: Math.PI
      },
      {
        _id: getID(),
        displayName: 'Y',
        key: 'positionY',
        min: -Math.PI,
        max: Math.PI,
        step: 0.0001,
        multiply: Math.PI
      },
      {
        _id: getID(),
        displayName: 'Z',
        key: 'positionZ',
        min: -Math.PI,
        max: Math.PI,
        step: 0.0001,
        multiply: Math.PI
      }
    ]
  }
]

export const setupGraphics = async ({ ui, mounter, scene, camera }) => {
  let api = {}

  let makeGeo = () => {
    let geotype = ui.doc.geotype || 'box'
    let geometry = false
    if (geotype === 'box') {
      geometry = new THREE.BoxBufferGeometry(8.0, 8.0, 8.0, 64, 64, 64)
    } else if (geotype === 'cylinder') {
      geometry = new THREE.CylinderGeometry(5.0, 5.0, 10.0, 32, 32)
    } else if (geotype === 'torusknot') {
      geometry = new THREE.TorusKnotBufferGeometry(5.0, 0.4, 320, 320, 4.0)
    } else if (geotype === 'sphere') {
      geometry = new THREE.SphereBufferGeometry(6.0, 64, 64)
    }
    return geometry
  }
  let makeColor = () => {
    return new THREE.Color()
  }
  let makeMat = () => {
    return new THREE.ShaderMaterial({
      vertexShader: `
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
      void main (void) {
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

      uniform vec3 color;
      uniform vec3 lightDir;
      uniform float matShininess;
      void main (void) {
        // set the specular term to black
        vec4 spec = vec4(0.0);

        // normalize both input vectors
        vec3 n = normalize(vNormal);
        vec3 e = normalize(vec3(0.5, 0.0, 0.0));

        vec3 l_dir = normalize(vec3(lightDir));
        vec4 diffuse = vec4(vec3(color), 0.5);

        float intensity = max(dot(n, l_dir), 0.0);
        float shininess = matShininess;
        vec4 specular = vec4(1.0, 0.5, 0.5, 1.0);

        // if the vertex is lit compute the specular color
        if (intensity > 0.0) {
            // compute the half vector
            vec3 h = normalize(l_dir + e);
            // compute the specular term into spec
            float intSpec = max(dot(h,n), 0.0);
            spec = specular * pow(intSpec, shininess);
        }
        gl_FragColor = (intensity * diffuse + spec);
        gl_FragColor.a = clamp(gl_FragColor.a, 0.0, 0.67);
      }

      `,
      uniforms,
      transparent: true
    })
  }
  let geometry = makeGeo()
  let color = makeColor()

  let uniforms = {
    twist: {
      value: new THREE.Vector3()
    },
    time: {
      value: 0
    },
    color: {
      value: color
    },
    lightDir: {
      value: new THREE.Vector3()
    },
    matShininess: {
      value: 0.0
    }
  }

  let setShinrness = () => {
    uniforms.matShininess.value = ui.doc.matShininess
  }
  setShinrness()

  let setLightDir = () => {
    uniforms.lightDir.value.x = ui.doc.lightDirX
    uniforms.lightDir.value.y = ui.doc.lightDirY
    uniforms.lightDir.value.z = ui.doc.lightDirZ
  }
  setLightDir()

  let setColors = () => {
    color.setHSL(ui.doc.hue, ui.doc.satuation, ui.doc.light)
    uniforms.color.value = color
    scene.background = new THREE.Color().setHSL(ui.doc.bghue, ui.doc.bgsatuation, ui.doc.bglight)
  }
  let setRot = () => {
    if (!mesh) {
      return
    }
    mesh.rotation.x = Number(ui.doc.rotateX) || 0
    mesh.rotation.y = Number(ui.doc.rotateY) || 0
    mesh.rotation.z = Number(ui.doc.rotateZ) || 0
  }
  let setPos = () => {
    if (!mesh) {
      return
    }
    mesh.position.x = Number(ui.doc.positionX) || 0
    mesh.position.y = Number(ui.doc.positionY) || 0
    mesh.position.z = Number(ui.doc.positionZ) || 0
  }
  let setTwist = () => {
    if (!mesh) {
      return
    }
    uniforms.twist.value.x = Number(ui.doc.twistX) || 0
    uniforms.twist.value.y = Number(ui.doc.twistY) || 0
    uniforms.twist.value.z = Number(ui.doc.twistZ) || 0
  }
  setColors()
  let material = makeMat()
  await wait()

  scene.userData._id = ui._id
  // eslint-disable-next-line
  ui.doc = new Proxy(ui.doc, {
    async set (obj, prop, value) {
      if (ui._id !== scene.userData._id) {
        return true
      }
      if (obj[prop] !== value) {
        obj[prop] = value

        if (prop === 'geotype') {
          await wait()
          mesh.geometry = makeGeo()
        }
        if (prop === 'hue') {
          setColors()
        }
        if (prop === 'satuation') {
          setColors()
        }
        if (prop === 'light') {
          setColors()
        }

        if (prop === 'mattype') {
          mesh.material = makeMat()
        }

        if (prop === 'bgsatuation') {
          setColors()
        }
        if (prop === 'bglight') {
          setColors()
        }
        if (prop === 'bghue') {
          setColors()
        }

        if (prop === 'lightDirX') {
          setLightDir()
        }
        if (prop === 'lightDirY') {
          setLightDir()
        }
        if (prop === 'lightDirZ') {
          setLightDir()
        }

        if (prop === 'matShininess') {
          setShinrness()
        }

        if (prop === 'positionX') {
          setPos()
        }
        if (prop === 'positionY') {
          setPos()
        }
        if (prop === 'positionZ') {
          setPos()
        }

        if (prop === 'rotateX') {
          setRot()
        }
        if (prop === 'rotateY') {
          setRot()
        }
        if (prop === 'rotateZ') {
          setRot()
        }

        if (prop === 'twistX') {
          setTwist()
        }
        if (prop === 'twistY') {
          setTwist()
        }
        if (prop === 'twistZ') {
          setTwist()
        }
      }
      return true
    }
  })

  await wait()

  // let mesh = new THREE.Points(geometry, material)
  let mesh = new THREE.Mesh(geometry, material)
  setTwist()
  setPos()
  setRot()

  let tweener = ({ type, time, multiply = 1, min = false, max = false }) => {
    let filter = v => v
    if (min === 0) {
      filter = Math.abs
    }
    if (type === 1) {
      time = multiply * time * 1 / 3 % multiply * 1.0
    } else if (type === 2) {
      time = multiply * time * 1.0 % multiply * 1.0
    } else if (type === 3) {
      time = multiply * time * 2.0 % multiply * 1.0
    } else if (type === 4) {
      time = multiply * Math.sin(time * 0.5) % multiply * 1.0
    } else if (type === 5) {
      time = multiply * Math.cos(time * 0.5) % multiply * 1.0
    } else if (type === 6) {
      time = multiply * Math.sin(time) * Math.sin(time) % multiply * 1.0
    } else if (type === 7) {
      time = multiply * Math.cos(time) * Math.cos(time) % multiply * 1.0
    } else if (type === 8) {
      time = multiply * time * 0.1 % multiply * 1.0
    } else if (type === 9) {
      time = multiply * time * 0.2 % multiply * 1.0
    }
    time = filter(time)

    if (min !== false) {
      if (time < min) {
        time = min
      }
    }
    if (max !== false) {
      if (time > max) {
        time = max
      }
    }

    // if (type === 4) {
    //   time = time * 0.5 % 1
    //   return time
    // }

    return time
  }

  let procAnimation = ({ time }) => {
    for (var kn in ui.doc) {
      let tween = ui.tween[kn]
      if (tween) {
        let tweenType = ui.tween[kn].type
        let multiply = ui.tween[kn].multiply
        let min = ui.tween[kn].min
        let max = ui.tween[kn].max
        if (tweenType && tweenType !== 0 && tweenType !== '0') {
          ui.doc[kn] = tweener({ type: tweenType, time, multiply, min, max })
        }
      }
    }
  }

  api.render = ({ parallax = 0 }) => {
    let time = uniforms.time.value = window.performance.now() * 0.001
    if (parallax) {
      mesh.rotation.z = parallax * Math.PI * 2.0
    }
    procAnimation({ time })
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
