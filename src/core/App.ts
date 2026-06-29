import { Project } from "./Project";

export class App {
  project: Project;

  constructor() {
    this.project = new Project("Untitled Project");
  }
}