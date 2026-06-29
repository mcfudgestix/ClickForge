import { Part } from "../models/Part"

export class Project {

  parts: Part[] = []

  addPart(part: Part) {

    this.parts.push(part)

  }

}