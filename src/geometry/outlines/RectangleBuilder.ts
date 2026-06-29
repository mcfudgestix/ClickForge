import * as THREE from "three";
import type { Part } from "../../models/Part";
import type { IOutlineBuilder } from "./IOutlineBuilder";

export class RectangleBuilder implements IOutlineBuilder {

    create(part: Part): THREE.Shape {

        const shape = new THREE.Shape();

        const w = part.width / 2;
        const h = part.height / 2;

        shape.moveTo(-w, -h);
        shape.lineTo(w, -h);
        shape.lineTo(w, h);
        shape.lineTo(-w, h);
        shape.closePath();

        return shape;

    }

}