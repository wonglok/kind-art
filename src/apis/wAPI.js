import marked from 'marked'
import { getID } from './api'
export const calcScreen = ({ zPos = 0, camera, rect = { width: 1, height: 1 } }) => {
  const cameraZ = camera.position.z
  const distance = cameraZ - zPos
  const aspect = rect.width / rect.height
  const vFov = camera.fov * Math.PI / 180
  const planeHeightAtDistance = 2 * Math.tan(vFov / 2) * distance
  const planeWidthAtDistance = planeHeightAtDistance * aspect

  /*
  let dist = camera.position.z - mesh.position.z
  let height = ... // desired height to fit
  camera.fov = 2 * Math.atan(height / (2 * dist)) * (180 / Math.PI)
  camera.updateProjectionMatrix()
  */

  return {
    aspect: planeWidthAtDistance / planeHeightAtDistance,
    vmin: Math.min(planeWidthAtDistance, planeHeightAtDistance),
    vmax: Math.max(planeWidthAtDistance, planeHeightAtDistance),
    width: planeWidthAtDistance,
    height: planeHeightAtDistance
  }
}

export const aphorismCollections = () => [
  {
    _id: getID(),
    title: 'Aphorism 2018',
    // eslint-disable-next-line
    quotes: marked.lexer(require('raw-loader!../content/aphorisms-2018.md').default)
      .filter(e => e.type === 'paragraph')
      .map((item) => {
        return {
          _id: getID(),
          text: item.text
        }
      })
  }
]

console.log(aphorismCollections)
