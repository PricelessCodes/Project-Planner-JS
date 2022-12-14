import { Component } from "./Component.js";

export class Tooltip extends Component {
    constructor(closeNotifierFunction) {
        super();
        this.closeNotifierHandler = closeNotifierFunction;
        this.create();
    }

    create() {
        const tooltipElement = document.createElement("div");
        tooltipElement.className = "card";
        tooltipElement.addEventListener("click", this.closeTooltip.bind(this));
        tooltipElement.textContent = "Dumm!!!!!!";
        this.element = tooltipElement;
    }

    closeTooltip() {
        this.detach();
        this.closeNotifierHandler(false);
    }
}