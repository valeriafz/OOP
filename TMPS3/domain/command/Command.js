// command/Command.js
class Command {
  execute() {
    throw new Error("Execute method must be implemented");
  }

  undo() {
    throw new Error("Undo method must be implemented");
  }
}

module.exports = Command;
