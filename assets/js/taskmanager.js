// const { builtinModules } = require("module");


//HTML template literal that gets rendered using JS 
const createTaskHtml = (id, taskTitle, description, assignedTo, dueDate, taskStatus) => {
    const html = `
    <li class="list-group-item" data-task-id="${id}">
        <div class="d-flex w-100 mt-2 justify-content-between align-items-center">
            <h5>${taskTitle}</h5>
            <span class="status badge badge-danger bg-danger">${taskStatus}</span>
        </div>
        <div class="d-flex w-100 mb-3 justify-content-between">
            <small>Assigned To: ${assignedTo}</small>
            <small>Due: ${dueDate}</small>
        </div>
        <p class="description">${description}</p>
        <div>
            <button type="button" class="done-button btn btn-primary">Mark as Done</button>
            <button type="button" class="delete-button btn btn-secondary">Delete</button>
        </div>
    </li>
    `
    return html;
}

//Class for task manager; this.tasks set to empty array, this.currentId set to 0
class TaskManager {
    constructor() {
        this.tasks = [];
        this.currentId = 0;
    }

    //Add task function; pushes tasks to template literal, this.currentId increments each task
    addTask(taskTitle, description, assignedTo, dueDate, taskStatus = 'TODO') {
        this.tasks.push({ 'id': this.currentId, 'taskTitle': taskTitle, 'description': description, 'assignedTo': assignedTo, 'dueDate': dueDate, 'taskStatus': taskStatus });
        this.currentId++
    }

    //Render function; for look to look though this.tasks and renders
    render() {
        clearBox();
        const tasksHtmlList = [];
        for (let i = 0; i < this.tasks.length; i++) {
            const firstVariable = this.tasks[i];
            const date = new Date(firstVariable.dueDate);
            date.setDate(date.getDate() + 1);
            const formattedDate = date.toDateString();
            const taskHtml = createTaskHtml(firstVariable.id, firstVariable.taskTitle, firstVariable.description, firstVariable.assignedTo, formattedDate, firstVariable.taskStatus)
            tasksHtmlList.push(taskHtml);
        }

        const tasksHtml = tasksHtmlList.join('\n');
        const element = document.createElement('div');
        element.appendChild(document.createTextNode(createTaskHtml));
        document.getElementById('task-list').appendChild(element);
        element.innerHTML = tasksHtml;
    }


    //For loop to look though this.tasks 
    getTaskById(taskId) {
        let foundTask;
        for (let i = 0; i < this.tasks.length; i++) {
            let task = this.tasks[i];
            if (task.id === taskId) {
                foundTask = task;
            }
        }
        return foundTask;
    }

    //Saves to local storage
    save() {
        const tasksJson = JSON.stringify(this.tasks);
        localStorage.setItem('tasks', tasksJson);
        const currentId = JSON.stringify(this.currentId);
        localStorage.setItem('currentId', currentId);
    }

    //Loads to local storage
    load() {
        const tasks = localStorage.getItem('tasks');
        this.tasks = JSON.parse(tasks);
        const currentId = localStorage.getItem('currentId');
        this.currentId = Number(currentId);
    }

    //Deletes task
    delete(taskId) {
        const newTasks = [];
        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];
            if (task.id !== taskId) {
                newTasks.push(task);
            }
        }
        this.tasks = newTasks;
    }

}

//Clear box function; replaces HTML
const clearBox = () => {
    document.getElementById('task-list').innerHTML = '';
}

// module.exports = TaskManager;