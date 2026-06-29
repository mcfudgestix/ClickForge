import type { Part } from "../models/Part";

export class Project {
  name: string;
  parts: Part[];

  constructor(name: string) {
    this.name = name;
    this.parts = [];
  }

  addPart(part: Part) {
    this.parts.push(part);
  }

  removePart(id: string) {
    this.parts = this.parts.filter(p => p.id !== id);
  }

  getPart(id: string) {
    return this.parts.find(p => p.id === id);
  }

  clear() {
    this.parts = [];
  }
}