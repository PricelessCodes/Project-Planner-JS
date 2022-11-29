class DOMHelper {
    static moveElement(elementId, newDestinationSelector) {
        //move project element from active to finished projects and vise versa
        const element = document.getElementById(elementId);
        const destination = document.querySelector(newDestinationSelector);
        destination.append(element);
    }

    static clearEventListeners(element) {
        //cloning an element and replace it self, remove all event listeners
        const clonedElement = element.cloneNode(true);
        element.replaceWith(clonedElement);

        return clonedElement;
    }
}

class Tooltip {
    constructor(closeNotifierFunction) {
        this.closeNotifierHandler = closeNotifierFunction
    }

    attach() {
        const tooltipElement = document.createElement("div");
        tooltipElement.className = "card";
        tooltipElement.addEventListener("click", this.closeTooltip.bind(this));
        tooltipElement.textContent = "Dumm!!!!!!";
        document.body.append(tooltipElement);
        this.tooltipElement = tooltipElement;
    }

    detach() {
        this.tooltipElement.remove();
    }
    closeTooltip() {
        this.detach();
        this.closeNotifierHandler(false);
    }
}

class ProjectItem {
    hasToolTip = false;
    constructor(id, updateProjectsListsFunction, type) {
        this.id = id;
        this.type = type;
        this.updateProjectsListsHandler = updateProjectsListsFunction;
        this.connectMoreInfoButton();
        this.connectSwitchButton();
    }

    set setType(type) {
        this.type = type;
    }

    setHasToolTip(hasToolTip) {
        this.hasToolTip = hasToolTip;
    }

    showMoreInfoButtonHandler() {
        if (this.hasToolTip) return;

        const tooltip = new Tooltip(this.setHasToolTip.bind(this));
        tooltip.attach();
        this.setHasToolTip(true);
    }

    connectMoreInfoButton() {
        const projectItemElement = document.getElementById(this.id);
        let MoreInfoBtn = projectItemElement.querySelector(
            "button:first-of-type"
        );

        MoreInfoBtn.addEventListener("click", this.showMoreInfoButtonHandler.bind(this));
    }

    connectSwitchButton() {
        const projectItemElement = document.getElementById(this.id);
        let switchBtn = projectItemElement.querySelector("button:last-of-type");
        switchBtn = DOMHelper.clearEventListeners(switchBtn);
        switchBtn.textContent = this.type;
        switchBtn.addEventListener("click", this.updateProjectsListsHandler);
    }

    updateProjectState(type, updateProjectsListsFunction) {
        this.setType = type;
        this.updateProjectsListsHandler = updateProjectsListsFunction;
        this.connectSwitchButton();
    }
}

class ProjectList {
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
