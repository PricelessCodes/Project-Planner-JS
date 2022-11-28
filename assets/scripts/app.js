class Tooltip {}

class ProjectItem {
    constructor(id) {
        this.id = id;
        this.connectMoreInfoButton();
        this.connectSwitchButton();
    }

    connectMoreInfoButton() {}

    connectSwitchButton() {
        const projectItemElement = document.getElementById(this.id);
        const switchBtn = projectItemElement.querySelector(
            "button:last-of-type"
        );
        switchBtn.addEventListener("click");
    }
}

class ProjectList {
    projects = [];
    type = "";
    switchHandlerFunction = null;
    constructor(type, switchHandlerFunction) {
        this.type = type;
        this.switchHandlerFunction = switchHandlerFunction;
        const projectItems = document.querySelectorAll(`#${type}-projects li`);
        for (const pi of projectItems) {
            this.projects.push(new ProjectItem(pi.id));
        }
    }

    addProject() {}

    switchProject(projectId) {
        const projectIndex = this.projects.findIndex((p) => p.id === projectId);
        if (projectId !== -1) {
            //add project to other array of projects
            this.switchHandlerFunction(projects[projectIndex]);
            //remove found project from this array
            this.projects.splice(projectIndex, 1);
        }
    }
}

class App {
    static init() {
        const activeProjectsList = new ProjectList("active");
        const finishedProjectsList = new ProjectList("finished");
    }
}

App.init();
