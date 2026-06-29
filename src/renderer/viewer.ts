import * as THREE from 'three'

type BlankSettings = {
  shape: string
  width: number
  height: number
  thickness: number
  switchHole: number
}

let scene: THREE.Scene
let blankGroup: THREE.Group | null = null

export function createViewer() {
  const viewer = document.querySelector<HTMLDivElement>('#viewer')!

  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x2b2b2b)

  const camera = new THREE.PerspectiveCamera(
    45,
    viewer.clientWidth / viewer.clientHeight,
    0.1,
    1000
  )

  camera.position.set(75, 60, 85)
  camera.lookAt(0, 0, 0)

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(viewer.clientWidth, viewer.clientHeight)
  viewer.appendChild(renderer.domElement)

  scene.add(new THREE.AmbientLight(0xffffff, 0.8))

  const light = new THREE.DirectionalLight(0xffffff, 2)
  light.position.set(40, 60, 50)
  scene.add(light)

  const grid = new THREE.GridHelper(140, 14)
  grid.rotation.x = Math.PI / 2
  scene.add(grid)

  function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }

  animate()
}

export function updateBlank(settings: BlankSettings) {
  if (blankGroup) {
    scene.remove(blankGroup)
  }

  blankGroup = new THREE.Group()

  const body = createShape(settings)
  blankGroup.add(body)

  const switchHole = createSwitchHole(settings.switchHole, settings.thickness)
  blankGroup.add(switchHole)

  scene.add(blankGroup)
}

function createShape(settings: BlankSettings) {
  let geometry: THREE.BufferGeometry

  if (settings.shape === 'circle') {
    geometry = new THREE.CylinderGeometry(
      settings.width / 2,
      settings.width / 2,
      settings.thickness,
      80
    )
    geometry.rotateX(Math.PI / 2)
  } else if (settings.shape === 'heart') {
    geometry = createHeartGeometry(settings.width, settings.height, settings.thickness)
  } else {
    geometry = new THREE.BoxGeometry(
      settings.width,
      settings.height,
      settings.thickness
    )
  }

  const material = new THREE.MeshStandardMaterial({ color: 0x8b5cf6 })
  return new THREE.Mesh(geometry, material)
}

function createSwitchHole(size: number, thickness: number) {
  const geometry = new THREE.BoxGeometry(size, size, thickness + 0.4)
  const material = new THREE.MeshStandardMaterial({
    color: 0x111111,
  })

  const hole = new THREE.Mesh(geometry, material)
  hole.position.z = 0.1
  return hole
}

function createHeartGeometry(width: number, height: number, thickness: number) {
  const shape = new THREE.Shape()

  shape.moveTo(0, -height * 0.35)
  shape.bezierCurveTo(-width * 0.5, -height * 0.05, -width * 0.45, height * 0.35, -width * 0.15, height * 0.25)
  shape.bezierCurveTo(-width * 0.05, height * 0.45, width * 0.05, height * 0.45, width * 0.15, height * 0.25)
  shape.bezierCurveTo(width * 0.45, height * 0.35, width * 0.5, -height * 0.05, 0, -height * 0.35)

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: thickness,
    bevelEnabled: true,
    bevelSize: 1,
    bevelThickness: 1,
    bevelSegments: 2,
  })

  geometry.center()
  return geometry
}