import * as THREE from 'three'
require('requestidlecallback')

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

export const idle = () => {
  return new Promise((resolve) => window.requestIdleCallback(resolve, { timeout: 100 }))
}

export const setupGraphics = async ({ ui, mounter, scene, camera }) => {
  await idle()
  let api = {}
  api.cancel = false
  api.clean = () => {
    api.cancel = true
  }
  let makeGeo = () => {
    let geotype = ui.doc.geotype || 'box'
    let geometry = false
    if (geotype === 'box') {
      geometry = new THREE.BoxBufferGeometry(8.0, 8.0, 8.0, 20, 20, 20)
    } else if (geotype === 'cylinder') {
      geometry = new THREE.CylinderGeometry(5.0, 5.0, 10.0, 32, 32)
    } else if (geotype === 'torusknot') {
      geometry = new THREE.TorusKnotBufferGeometry(5.0, 0.4, 256, 256, 4.0)
    } else if (geotype === 'sphere') {
      geometry = new THREE.SphereBufferGeometry(6.0, 128, 128)
    }
    return geometry
  }
  let makeColor = () => {
    return new THREE.Color().setHSL(ui.doc.seed, 1, 0.75)
  }
  let makeMat = () => {
    return new THREE.ShaderMaterial({
      vertexShader: `
      uniform float time;

      varying vec3 vNormal;
      void main (void) {
        vec3 nPos = position;

        vNormal = (normalMatrix * normal);

        gl_Position = projectionMatrix * modelViewMatrix * vec4(nPos, 1.0);
      }
    `,
      fragmentShader: `
      varying vec3 vNormal;

      uniform vec3 color;
      void main (void) {
        // set the specular term to black
        vec4 spec = vec4(0.0);

        // normalize both input vectors
        vec3 n = normalize(vNormal);
        vec3 e = normalize(vec3(0.5, 0.0, 0.0));

        vec3 l_dir = vec3(0.5, 1.0, 0.5);

        vec4 diffuse = vec4(vec3(color), 0.5);

        float intensity = max(dot(n, l_dir), 0.0);
        float shininess = 3.0;
        vec4 specular = vec4(1.0, 0.5, 0.5, 1.0);

        // if the vertex is lit compute the specular color
        if (intensity > 0.0) {
            // compute the half vector
            vec3 h = normalize(l_dir + e);
            // compute the specular term into spec
            float intSpec = max(dot(h,n), 0.0);
            spec = specular * pow(intSpec,shininess);
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
    time: {
      value: 0
    },
    color: {
      value: color
    }
  }
  let material = makeMat()

  ui.doc = new Proxy(ui.doc, {
    async set (obj, prop, value) {
      if (api.cancel) {
        return true
      }
      if (obj[prop] !== value) {
        obj[prop] = value

        if (prop === 'geotype') {
          await idle()
          mesh.geometry = makeGeo()
        }
        if (prop === 'seed') {
          color.setHSL(ui.doc.seed, 1, 0.75)
          uniforms.color.value = color
          scene.background = color.clone().offsetHSL(0.05, 0.0, 0.2)
        }
        if (prop === 'vertexShader') {
          mesh.material = makeMat()
        }
        if (prop === 'fragmentShader') {
          mesh.material = makeMat()
        }
      }
      return true
    }
  })

  await idle()

  let mesh = new THREE.Mesh(geometry, material)
  api.getObject = () => mesh
  scene.background = color.clone().offsetHSL(0.05, 0.0, 0.2)

  api.render = ({ parallax = undefined }) => {
    uniforms.time.value = window.performance.now() * 0.001

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
