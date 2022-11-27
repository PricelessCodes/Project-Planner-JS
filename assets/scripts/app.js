class Tooltip {}

class ProjectItem {}

class ProjectList {
    constructor(type) {
        const projectItems = document.querySelectorAll(`#${type}-projects li`);
        ///asw
    }
}

class App {
    static init() {
        const activeProjectsList = new ProjectList("active");
        const finishedProjectsList = new ProjectList("finished");
    }
}

App.init();
