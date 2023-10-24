const fs = require("fs");
const path = require("path");
const readline = require("readline");

class File {
  constructor(filename, extension, createdTime, updatedTime) {
    this.filename = filename;
    this.extension = extension;
    this.createdTime = createdTime;
    this.updatedTime = updatedTime;
  }

  info() {
    console.log(`File: ${this.filename}.${this.extension}`);
    console.log(`Created: ${this.createdTime}`);
    console.log(`Updated: ${this.updatedTime}`);
  }

  status(snapshotTime) {
    if (this.updatedTime > snapshotTime) {
      console.log(`${this.filename}.${this.extension} - Changed`);
    } else {
      console.log(`${this.filename}.${this.extension} - No change`);
    }
  }
}

class ImageFile extends File {
  constructor(filename, extension, createdTime, updatedTime, imageSize) {
    super(filename, extension, createdTime, updatedTime);
    this.imageSize = imageSize;
  }

  info() {
    super.info();
    console.log(`Image Size: ${this.imageSize}`);
  }
}

class TextFile extends File {
  constructor(
    filename,
    extension,
    createdTime,
    updatedTime,
    lineCount,
    wordCount,
    charCount
  ) {
    super(filename, extension, createdTime, updatedTime);
    this.lineCount = lineCount;
    this.wordCount = wordCount;
    this.charCount = charCount;
  }

  info() {
    super.info();
    console.log(`Line Count: ${this.lineCount}`);
    console.log(`Word Count: ${this.wordCount}`);
    console.log(`Character Count: ${this.charCount}`);
  }
}

class ProgramFile extends File {
  constructor(
    filename,
    extension,
    createdTime,
    updatedTime,
    lineCount,
    classCount,
    methodCount
  ) {
    super(filename, extension, createdTime, updatedTime);
    this.lineCount = lineCount;
    this.classCount = classCount;
    this.methodCount = methodCount;
  }

  info() {
    super.info();
    console.log(`Line Count: ${this.lineCount}`);
    console.log(`Class Count: ${this.classCount}`);
    console.log(`Method Count: ${this.methodCount}`);
  }
}

class Snapshot {
  constructor() {
    this.snapshotTime = new Date();
    this.files = [];
  }

  commit() {
    this.snapshotTime = new Date();
    console.log(`Created snapshot at: ${this.snapshotTime}`);
  }

  addFile(file) {
    this.files.push(file);
  }

  info(filename) {
    const file = this.files.find((f) => f.filename === filename);
    if (file) {
      file.info();
    } else {
      console.log(`File not found: ${filename}`);
    }
  }

  status() {
    console.log(`Snapshot time: ${this.snapshotTime}`);
    for (const file of this.files) {
      file.status(this.snapshotTime);
    }
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const snapshot = new Snapshot();

function updateFileList(dirPath) {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);
      const createdTime = stats.birthtime;
      const updatedTime = stats.mtime;

      const [filename, extension] = file.split(".");
      let fileObj;

      // Determine the file type and create the appropriate object
      if (["png", "jpg"].includes(extension)) {
        fileObj = new ImageFile(
          filename,
          extension,
          createdTime,
          updatedTime,
          "1024x860"
        );
      } else if (extension === "txt") {
        fileObj = new TextFile(
          filename,
          extension,
          createdTime,
          updatedTime,
          100,
          500,
          3000
        );
      } else if (["py", "java"].includes(extension)) {
        fileObj = new ProgramFile(
          filename,
          extension,
          createdTime,
          updatedTime,
          200,
          10,
          30
        );
      } else {
        fileObj = new File(filename, extension, createdTime, updatedTime);
      }

      snapshot.addFile(fileObj);
    }

    snapshot.status();
  });
}

// Set the directory path to monitor (change this to your lab3 folder)
const directoryToWatch = ".";

// Watch for changes in the directory
fs.watch(directoryToWatch, (eventType, filename) => {
  if (filename) {
    console.log(`Change detected: ${filename}`);
    updateFileList(directoryToWatch);
  }
});

updateFileList(directoryToWatch);

function showMenu() {
  console.log("Git-Like Menu:");
  console.log("1. Commit");
  console.log("2. Info");
  console.log("3. Status");
  console.log("4. Exit");
  rl.question("Select an option: ", (option) => {
    if (option === "1") {
      snapshot.commit();
      showMenu();
    } else if (option === "2") {
      rl.question("Enter filename: ", (filename) => {
        snapshot.info(filename);
        showMenu();
      });
    } else if (option === "3") {
      snapshot.status();
      showMenu();
    } else if (option === "4") {
      rl.close();
    } else {
      console.log("Invalid option. Please select a valid option.");
      showMenu();
    }
  });
}

showMenu();
