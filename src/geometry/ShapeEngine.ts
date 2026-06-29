import * as THREE from 'three'
import type { Part } from '../models/Part'
import { ConnectorBuilder } from './ConnectorBuilder'

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

  return createRectangleOutline(part)
}

function createRectangleOutline(part: Part): THREE.Shape {
  const shape = new THREE.Shape()

  const w = part.width / 2
  const h = part.height / 2

const connectorBuilder = new ConnectorBuilder()

const tabLength = connectorBuilder.getTabLength(part)
const tabHeight = connectorBuilder.getTabHeight(part)
const slotLength = connectorBuilder.getSlotLength(part)
const slotHeight = connectorBuilder.getSlotHeight(part)

const tabHalf = tabHeight / 2
const slotHalf = slotHeight / 2

  shape.moveTo(-w, -h)
  shape.lineTo(w, -h)

  // right tab
  shape.lineTo(w, -tabHalf)
  shape.lineTo(w + tabLength, -tabHalf)
  shape.lineTo(w + tabLength, tabHalf)
  shape.lineTo(w, tabHalf)

  shape.lineTo(w, h)
  shape.lineTo(-w, h)

  // left slot
  shape.lineTo(-w, slotHalf)
  shape.lineTo(-w + slotLength, slotHalf)
  shape.lineTo(-w + slotLength, -slotHalf)
  shape.lineTo(-w, -slotHalf)

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