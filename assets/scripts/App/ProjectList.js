import { ProjectItem } from "./ProjectItem.js";
import { DOMHelper } from "../Utility/DOMHelper.js";

export class ProjectList {
    projects = [];
    type = "";
    switchHandler = null;
    constructor(type) {
        this.type = type;
        const projectItems = document.querySelectorAll(`#${type}-projects li`);
        for (const pie of projectItems) {
            const pi = new ProjectItem(
                pie.id,
                this.switchProject.bind(this, pie.id),
                type
            );
            this.projects.push(pi);
        }
    }

    setSwitchHandlerFunction(switchHandlerFunction) {
        this.switchHandler = switchHandlerFunction;
    }

    addProject(project) {
        project.updateProjectState(
            this.type,
            this.switchProject.bind(this, project.id)
        );
        this.projects.push(project);
        DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
    }

    switchProject(projectId) {
        const projectIndex = this.projects.findIndex((p) => p.id === projectId);
        if (projectIndex !== -1) {
            //add project to other array of projects
            console.log(projectIndex);
            this.switchHandler(this.projects[projectIndex]);
            //remove found project from this array
            this.projects.splice(projectIndex, 1);
        }
    }
}