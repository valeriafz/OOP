const path = require("path");
const readline = require("readline");
const { updateFileList } = require("./updateFileList");
const fs = require("fs");
const Snapshot = require("./snapshot");

const directoryToWatch = "../files";
const snapshot = new Snapshot(directoryToWatch);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let isUpdating = false;

fs.watch(directoryToWatch, async (eventType, filename) => {
  if (filename && !isUpdating) {
    isUpdating = true;
    console.log(`Change detected: ${filename}`);
    try {
      let files = await updateFileList(directoryToWatch);
      files.forEach((file) => {
        snapshot.addFile(file);
      });
      console.log("File list updated");
    } catch (error) {
      console.error("Error updating file list:", error);
    } finally {
      isUpdating = false;
    }
  }
});

function showMenu() {
  let isUserSelectedOption3 = false;
  console.log("Git-Like Menu:");
  console.log("1. Commit");
  console.log("2. Info");
  console.log("3. Status");
  console.log("4. Exit");

  rl.question("Select an option: ", async (option) => {
    switch (option) {
      case "1":
        await snapshot.commit(directoryToWatch);
        break;
      case "2":
        console.log("Files in directory:", fs.readdirSync(directoryToWatch));
        const filename = await askQuestion("Enter filename: ");
        snapshot.info(filename);
        break;
      case "3":
        snapshot.status(true);
        break;
      case "4":
        rl.close();
        return;
      default:
        console.log("Invalid option. Please select a valid option.");
    }

    showMenu();
  });
}

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

showMenu();
