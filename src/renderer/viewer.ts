import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import type { Part } from '../models/Part'
import { createPartMesh } from '../geometry/ShapeEngine'

let scene: THREE.Scene
let blankGroup: THREE.Group | null = null
let renderer: THREE.WebGLRenderer
let camera: THREE.PerspectiveCamera
let controls: OrbitControls

export function createViewer() {
  const viewer = document.querySelector<HTMLDivElement>('#viewer')!

  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x2b2b2b)

  camera = new THREE.PerspectiveCamera(
    45,
    viewer.clientWidth / viewer.clientHeight,
    0.1,
    1000
  )

  camera.position.set(75, 60, 85)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(viewer.clientWidth, viewer.clientHeight)
  viewer.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 0, 0)
  controls.enableDamping = true
  controls.dampingFactor = 0.08
  controls.enablePan = true
  controls.enableZoom = true

  scene.add(new THREE.AmbientLight(0xffffff, 0.8))

  const light = new THREE.DirectionalLight(0xffffff, 2)
  light.position.set(40, 60, 50)
  scene.add(light)

  const grid = new THREE.GridHelper(140, 14)
  scene.add(grid)

  const axes = new THREE.AxesHelper(40)
  scene.add(axes)

  window.addEventListener('resize', resizeViewer)

  animate()
}

export function updateBlank(part: Part) {
  if (blankGroup) {
    scene.remove(blankGroup)
  }

  blankGroup = createPartMesh(part)
  scene.add(blankGroup)
}

function resizeViewer() {
  const viewer = document.querySelector<HTMLDivElement>('#viewer')!

  camera.aspect = viewer.clientWidth / viewer.clientHeight
  camera.updateProjectionMatrix()

  renderer.setSize(viewer.clientWidth, viewer.clientHeight)
}

function animate() {
  requestAnimationFrame(animate)

  controls.update()
  renderer.render(scene, camera)
}