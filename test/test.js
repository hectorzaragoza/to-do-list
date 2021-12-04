//Get access to Mocha
// const assert = require('assert');
// const TaskManager = require('../assets/js/taskmanager.js');
const { assert } = chai;

//Use Describe and It to set up and test addTask, deleteTask, getTaskById
describe('TaskManager', () => {
    describe('.addTask', () => {
        it('addTask() should create an array of objects with form information', () => {
            //Setup
            const classInstance = new TaskManager();
            const task = { "taskTitle": 1, "description": 2, "assignedTo": 3, "dueDate": 4, "taskStatus": 5, "id": 0 }
            const array = [task]
            //Exercise
            classInstance.addTask(1, 2, 3, 4, 5)
            //Verify
            assert.deepEqual(classInstance.tasks, array);
        })
    })
    describe('.deleteTask', () => {
        it('deletaTask() should delete task[i] from array when task[i]\'s delete button is pressed', () => {
            //Setup
            const classInstance = new TaskManager();
            const result = []
            //Exercise
            classInstance.addTask(1, 2, 3, 4, 5)
            classInstance.delete(0);
            const task = classInstance.tasks
            //Verify
            assert.ok(task, result);
        })
    })
    describe('getTaskById', () => {
        it('getTaskById() should return task', () => {
            //Setup
            const classInstance = new TaskManager();
            const task = [{ "taskTitle": 1, "description": 2, "assignedTo": 3, "dueDate": 4, "taskStatus": 5, "id": 0 }];
            //Exercise
            classInstance.addTask(1, 2, 3, 4, 5)
            classInstance.getTaskById(0);

            //Verify
            assert.deepEqual(classInstance.tasks, task);
        })
    })
    describe('constructor', () => {
        it('initializing constructor should initialize tasks to an empyt array and current Id to 0', () => {
            //Setup
            const classInstance = new TaskManager();
            const tasks = []
            const currentId = 0
            //Exercise
            //Verify
            console.log(classInstance.tasks);
            console.log(classInstance.currentId);
            assert.deepEqual(classInstance.tasks, tasks);
            assert.deepEqual(classInstance.currentId, currentId);
        })
    })
})
