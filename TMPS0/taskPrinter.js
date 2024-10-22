class TaskPrinter {
  printTask(task) {
    console.log(
      `Task ${task.id}: ${task.description} - ${
        task.completed ? "Completed" : "Pending"
      }`
    );
  }

  printAllTasks(tasks) {
    tasks.forEach((task) => this.printTask(task));
  }
}

module.exports = TaskPrinter;
