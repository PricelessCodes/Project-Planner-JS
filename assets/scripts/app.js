class Tooltip {}

class ProjectItem {
    constructor(id, updateProjectsListsFunction) {
        this.id = id;
        this.updateProjectsListsHandler = updateProjectsListsFunction;
        this.connectMoreInfoButton();
        this.connectSwitchButton();
    }

    connectMoreInfoButton() {}

    connectSwitchButton() {
        const projectItemElement = document.getElementById(this.id);
        const switchBtn = projectItemElement.querySelector(
            "button:last-of-type"
        );
        switchBtn.addEventListener("click", this.updateProjectsListsHandler);
    }
}

class ProjectList {
    projects = [];
    type = "";
    switchHandler = null;
    constructor(type) {
        this.type = type;
        const projectItems = document.querySelectorAll(`#${type}-projects li`);
        for (const pi of projectItems) {
            this.projects.push(
                new ProjectItem(pi.id, this.switchProject.bind(this))
            );
        }
    }

    setSwitchHandlerFunction(switchHandlerFunction) {
        this.switchHandler = switchHandlerFunction;
    }

    addProject() {
        console.log(this);
    }

    switchProject(projectId) {
        const projectIndex = this.projects.findIndex((p) => p.id === projectId);
        if (projectId !== -1) {
            //add project to other array of projects
            this.switchHandler(this.projects[projectIndex]);
            //remove found project from this array
            this.projects.splice(projectIndex, 1);
        }
    }
}

class App {
    static init() {
        const activeProjectsList = new ProjectList("active");
        const finishedProjectsList = new ProjectList("finished");
        activeProjectsList.setSwitchHandlerFunction(
            finishedProjectsList.addProject.bind(finishedProjectsList)
        );
        finishedProjectsList.setSwitchHandlerFunction(
            activeProjectsList.addProject.bind(activeProjectsList)
        );
    }
}

App.init();
