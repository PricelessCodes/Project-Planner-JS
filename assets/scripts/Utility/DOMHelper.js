export class DOMHelper {
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