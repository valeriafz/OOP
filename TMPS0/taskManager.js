const Task = require("./task");

class TaskManager {
  constructor() {
    this.tasks = [];
  }

  addTask(description) {
    const id = this.tasks.length + 1;
    const newTask = new Task(id, description);
    this.tasks.push(newTask);
  }

  addMultipleTasks(descriptions) {
    descriptions.forEach((description) => this.addTask(description));
  }

  getTask(id) {
    return this.tasks.find((task) => task.id === id);
  }

  completeTask(id) {
    const task = this.getTask(id);
    if (task) {
      task.completed = true;
    }
  }

  completeMultipleTasks(ids) {
    ids.forEach((id) => this.completeTask(id));
  }

  getTasks() {
    return this.tasks;
  }
}

module.exports = TaskManager;
