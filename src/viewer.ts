import * as THREE from 'three'

let blank: THREE.Mesh | null = null
let scene: THREE.Scene

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

  camera.position.set(60, 40, 70)
  camera.lookAt(0, 0, 0)

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(viewer.clientWidth, viewer.clientHeight)
  viewer.appendChild(renderer.domElement)

  const light = new THREE.DirectionalLight(0xffffff, 2)
  light.position.set(40, 60, 50)
  scene.add(light)

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
  scene.add(ambientLight)

  updateBlank(40, 25, 4)

  function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }

  animate()
}

export function updateBlank(width: number, height: number, thickness: number) {
  if (blank) {
    scene.remove(blank)
    blank.geometry.dispose()
  }

  const geometry = new THREE.BoxGeometry(width, height, thickness)
  const material = new THREE.MeshStandardMaterial({ color: 0xeeeeee })

  blank = new THREE.Mesh(geometry, material)
  scene.add(blank)
}