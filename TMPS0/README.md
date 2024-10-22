# Task Manager: SOLID Principles Simple Project

This project demonstrates the implementation of two SOLID principles: the Single Responsibility Principle (SRP) and the Open-Closed Principle (OCP) in a simple task management system.

## Project Structure

The project consists of the following files:

1. `task.js`: Defines the Task class, the completion of each task being false at the start
2. `taskManager.js`: Implements the TaskManager class (adding tasks and marking them complete)
3. `taskPrinter.js`: Implements the TaskPrinter class, which is responsable of formatting
4. `taskFilter.js`: Defines the TaskFilter abstract class and its concrete implementations
5. `main.js`: Contains the usage example, where the user adds their own tasks and marks them as complete as they wish

## SOLID Principles Implementation

### Single Responsibility Principle (SRP)

The SRP states that a class should have only one reason to change. In this project, I've applied SRP by separating concerns into different classes:

1. `Task`: Responsible for representing a single task, by default each completion status is false until the user marks it as complete in the main file.

   ```javascript
   class Task {
     constructor(id, description, completed = false) {
       this.id = id;
       this.description = description;
       this.completed = completed;
     }
   }
   ```

2. `TaskManager`: Responsible for managing the collection of tasks: the user cand add/complete a single task or multiple at the same time.

   ```javascript
   class TaskManager {
     constructor() {
       this.tasks = [];
     }

     addTask(description) {
       /* ... */
     }
     addMultipleTasks(descriptions) {
       /* ... */
     }
     getTask(id) {
       /* ... */
     }
     completeTask(id) {
       /* ... */
     }
     completeMultipleTasks(ids) {
       /* ... */
     }
     getTasks() {
       /* ... */
     }
   }
   ```

3. `TaskPrinter`: Responsible for displaying tasks and if they are completed or still pending.
   ```javascript
   class TaskPrinter {
     printTask(task) {
       /* ... */
     }
     printAllTasks(tasks) {
       /* ... */
     }
   }
   ```

Each class has a single, well-defined responsibility, making the code more modular and easier to maintain.

### Open-Closed Principle (OCP)

The OCP states that software entities should be open for extension but closed for modification. I've applied this principle in the task filtering class:

```javascript
class TaskFilter {
  filter(tasks) {
    throw new Error("Method 'filter()' must be implemented.");
  }
}

class CompletedTaskFilter extends TaskFilter {
  filter(tasks) {
    return tasks.filter((task) => task.completed);
  }
}

class PendingTaskFilter extends TaskFilter {
  filter(tasks) {
    return tasks.filter((task) => !task.completed);
  }
}
```

The `TaskFilter` class is abstract and can be extended to create new filtering behaviors without modifying existing code. This allows to easily add new filters (e.g., a priority filter) without changing the existing filter implementations or the code that uses them.

## Usage

The `main.js` file demonstrates how to use the task management system:

```javascript
const taskManager = new TaskManager();
const taskPrinter = new TaskPrinter();

// Adding multiple tasks
taskManager.addMultipleTasks([
  "Learn JavaScript",
  "Implement SOLID principles",
  "Write unit tests",
  "Refactor code",
  "Deploy application",
]);

// Completing multiple tasks
taskManager.completeMultipleTasks([1, 3]);

// Printing all tasks
console.log("All tasks:");
taskPrinter.printAllTasks(taskManager.getTasks());

// Using filters
const completedFilter = new CompletedTaskFilter();
const pendingFilter = new PendingTaskFilter();

console.log("\nCompleted tasks:");
taskPrinter.printAllTasks(completedFilter.filter(taskManager.getTasks()));

console.log("\nPending tasks:");
taskPrinter.printAllTasks(pendingFilter.filter(taskManager.getTasks()));
```

## Running the Project

To run the project:

1. Ensure you have Node.js installed on your system.
2. Open a terminal in the project directory.
3. Run the command: `node main.js`
