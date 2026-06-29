import * as THREE from 'three'
import type { Part } from '../models/Part'

export function createPartMesh(part: Part): THREE.Group {
  const group = new THREE.Group()

  const outline = createOutline(part)
  addMxSwitchHole(outline, part.switchMount.cutoutSize)

  const geometry = new THREE.ExtrudeGeometry(outline, {
    depth: part.thickness,
    bevelEnabled: false,
  })

  geometry.center()

  const material = new THREE.MeshStandardMaterial({
    color: 0x8b5cf6,
    roughness: 0.6,
    side: THREE.DoubleSide,
  })

  group.add(new THREE.Mesh(geometry, material))
  return group
}

function createOutline(part: Part): THREE.Shape {
  if (part.shape === 'circle') {
    return createCircleOutline(part.width / 2)
  }

  if (part.shape === 'heart') {
    return createHeartOutline(part.width, part.height)
  }

  return createRectangleOutline(part.width, part.height)
}

function createRectangleOutline(width: number, height: number): THREE.Shape {
  const shape = new THREE.Shape()

  const w = width / 2
  const h = height / 2

  // Start at bottom-left, but include left slot and right tab
  shape.moveTo(-w, -h)
  shape.lineTo(w, -h)

  // right tab
  shape.lineTo(w, -6)
  shape.lineTo(w + 6, -6)
  shape.lineTo(w + 6, 6)
  shape.lineTo(w, 6)

  shape.lineTo(w, h)
  shape.lineTo(-w, h)

  // left slot cut-in
  shape.lineTo(-w, 6)
  shape.lineTo(-w + 6, 6)
  shape.lineTo(-w + 6, -6)
  shape.lineTo(-w, -6)

  shape.lineTo(-w, -h)
  shape.closePath()

  return shape
}

function createCircleOutline(radius: number): THREE.Shape {
  const shape = new THREE.Shape()
  shape.absarc(0, 0, radius, 0, Math.PI * 2, false)
  return shape
}

function createHeartOutline(width: number, height: number): THREE.Shape {
  const shape = new THREE.Shape()

  shape.moveTo(0, -height * 0.35)

  shape.bezierCurveTo(-width * 0.5, -height * 0.05, -width * 0.45, height * 0.35, -width * 0.15, height * 0.25)
  shape.bezierCurveTo(-width * 0.05, height * 0.45, width * 0.05, height * 0.45, width * 0.15, height * 0.25)
  shape.bezierCurveTo(width * 0.45, height * 0.35, width * 0.5, -height * 0.05, 0, -height * 0.35)

  return shape
}

function addMxSwitchHole(shape: THREE.Shape, size: number) {
  const hole = new THREE.Path()
  const s = size / 2

  hole.moveTo(-s, -s)
  hole.lineTo(s, -s)
  hole.lineTo(s, s)
  hole.lineTo(-s, s)
  hole.closePath()

  shape.holes.push(hole)
}