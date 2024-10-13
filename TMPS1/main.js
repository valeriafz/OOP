const TaskManager = require("./taskManager");
const TaskPrinter = require("./taskPrinter");
const { CompletedTaskFilter, PendingTaskFilter } = require("./taskFilter");

const taskManager = new TaskManager();
const taskPrinter = new TaskPrinter();

taskManager.addMultipleTasks([
  "Learn JavaScript",
  "Implement SOLID principles",
  "Push recent mini-project on Github",
  "Refactor code",
  "Write Unit Tests",
]);

taskManager.completeMultipleTasks([1, 2, 3]);
// taskManager.completeTask(4);

console.log("All tasks:");
taskPrinter.printAllTasks(taskManager.getTasks());

const completedFilter = new CompletedTaskFilter();
const pendingFilter = new PendingTaskFilter();

console.log("\nCompleted tasks:");
taskPrinter.printAllTasks(completedFilter.filter(taskManager.getTasks()));

console.log("\nPending tasks:");
taskPrinter.printAllTasks(pendingFilter.filter(taskManager.getTasks()));
