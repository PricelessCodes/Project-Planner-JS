import { DOMHelper } from "../Utility/DOMHelper.js";

export class ProjectItem {
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
        import("./Tooltip.js").then(module => {
            const tooltip = new module.Tooltip(this.setHasToolTip.bind(this));
        tooltip.attach();
        this.setHasToolTip(true);
        });
    }

    connectMoreInfoButton() {
        const projectItemElement = document.getElementById(this.id);
        let MoreInfoBtn = projectItemElement.querySelector(
            "button:first-of-type"
        );

        MoreInfoBtn.addEventListener(
            "click",
            this.showMoreInfoButtonHandler.bind(this)
        );
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