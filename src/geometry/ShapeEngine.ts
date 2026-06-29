import * as THREE from 'three'
import type { Part } from '../models/Part'

export function createPartMesh(part: Part): THREE.Group {
  const group = new THREE.Group()

  const body = createBodyMesh(part)
  const switchHole = createSwitchHoleMesh(part)

  group.add(body)
  group.add(switchHole)

  return group
}

function createBodyMesh(part: Part): THREE.Mesh {
  let geometry: THREE.BufferGeometry

  if (part.shape === 'circle') {
    geometry = new THREE.CylinderGeometry(
      part.width / 2,
      part.width / 2,
      part.thickness,
      80
    )
    geometry.rotateX(Math.PI / 2)
  } else if (part.shape === 'heart') {
    geometry = createHeartGeometry(part.width, part.height, part.thickness)
  } else {
    geometry = new THREE.BoxGeometry(part.width, part.height, part.thickness)
  }

  const material = new THREE.MeshStandardMaterial({ color: 0x8b5cf6 })
  return new THREE.Mesh(geometry, material)
}

function createSwitchHoleMesh(part: Part): THREE.Mesh {
  const geometry = new THREE.BoxGeometry(
    part.switchHole,
    part.switchHole,
    part.thickness + 0.4
  )

  const material = new THREE.MeshStandardMaterial({ color: 0x111111 })
  const hole = new THREE.Mesh(geometry, material)

  hole.position.z = 0.1

  return hole
}

function createHeartGeometry(width: number, height: number, thickness: number) {
  const shape = new THREE.Shape()

  shape.moveTo(0, -height * 0.35)
  shape.bezierCurveTo(
    -width * 0.5,
    -height * 0.05,
    -width * 0.45,
    height * 0.35,
    -width * 0.15,
    height * 0.25
  )
  shape.bezierCurveTo(
    -width * 0.05,
    height * 0.45,
    width * 0.05,
    height * 0.45,
    width * 0.15,
    height * 0.25
  )
  shape.bezierCurveTo(
    width * 0.45,
    height * 0.35,
    width * 0.5,
    -height * 0.05,
    0,
    -height * 0.35
  )

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