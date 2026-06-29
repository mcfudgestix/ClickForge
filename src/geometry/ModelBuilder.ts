import * as THREE from 'three'
import type { Part } from '../models/Part'
import { createPartMesh } from './ShapeEngine'

export class ModelBuilder {

    build(part: Part): THREE.Group {

        return createPartMesh(part)

    }

}