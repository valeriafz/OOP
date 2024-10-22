// Open-Closed Principle - class is open for extension (new filters) but closed for modification.

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

module.exports = { TaskFilter, CompletedTaskFilter, PendingTaskFilter };
