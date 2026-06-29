import * as THREE from "three";
import type { Part } from "../../models/Part";

export interface IOutlineBuilder {
    create(part: Part): THREE.Shape;
}