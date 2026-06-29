import * as THREE from 'three'

export class SwitchBuilder {

    apply(shape: THREE.Shape, cutout: number) {

        const hole = new THREE.Path()

        const s = cutout / 2

        hole.moveTo(-s,-s)
        hole.lineTo(s,-s)
        hole.lineTo(s,s)
        hole.lineTo(-s,s)
        hole.closePath()

        shape.holes.push(hole)

        return shape

    }

}