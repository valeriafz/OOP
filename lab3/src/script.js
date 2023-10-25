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
    console.log(`Created: ${this.createdTime.toUTCString()}`);
    console.log(`Updated: ${this.updatedTime.toUTCString()}`);
  }

  status(snapshotTime) {
    if (this.updatedTime > snapshotTime) {
      return `File: ${this.filename}.${this.extension} - Changed since last snapshot`;
    } else {
      return `File: ${this.filename}.${this.extension} - No change`;
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
    if (this.imageSize !== undefined) {
      console.log(`Image Size: ${this.imageSize}`);
    }
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
    this.snapshotTime = null;
    this.files = [];
  }

  addFile(file) {
    this.files.push(file);
  }

  commit() {
    this.snapshotTime = new Date();
    console.log(`Created snapshot at: ${this.snapshotTime}`);
  }

  info(filename) {
    console.log("Searching for:", filename);
    const file = this.files.find((f) => {
      return (
        f.filename.toLowerCase() === filename.toLowerCase() ||
        path.basename(f.filename, path.extname(f.filename)).toLowerCase() ===
          filename.toLowerCase()
      );
    });

    if (file) {
      file.info();
    } else {
      console.log(`File not found: ${filename}`);
    }
  }

  status() {
    if (this.snapshotTime) {
      console.log(`Snapshot time: ${this.snapshotTime}`);
      for (const file of this.files) {
        const status = file.status(this.snapshotTime);
        console.log(status);
      }
    } else {
      console.log(
        "No snapshot has been created. Please use option 1 (commit) first."
      );
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

    console.log("Files in directory:", files);

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);
      const createdTime = stats.mtime;
      const updatedTime = stats.birthtime;
      const filename = path.basename(file, path.extname(file));
      const extension = path.extname(file).slice(1);

      if (["png", "jpg", "gif"].includes(extension)) {
        const imageSize = getImageSize(filePath);
        fileObj = new ImageFile(
          filename,
          extension,
          createdTime,
          updatedTime,
          imageSize
        );
      } else if (extension === "txt") {
        const textStats = getTextFileStats(filePath);
        fileObj = new TextFile(
          filename,
          extension,
          createdTime,
          updatedTime,
          textStats.lineCount,
          textStats.wordCount,
          textStats.charCount
        );
      } else if (["py", "java", "js"].includes(extension)) {
        const programStats = getProgramFileStats(filePath, extension);
        fileObj = new ProgramFile(
          filename,
          extension,
          createdTime,
          updatedTime,
          programStats.lineCount,
          programStats.classCount,
          programStats.methodCount
        );
      } else {
        fileObj = new File(filename, extension, createdTime, updatedTime);
      }

      snapshot.addFile(fileObj);
    }
  });
  snapshot.status();
}

const directoryToWatch = "../files";
let isUpdating = false; // Flag to prevent multiple updates in a short time

fs.watch(directoryToWatch, (eventType, filename) => {
  if (filename && !isUpdating) {
    isUpdating = true; // Set the flag to prevent multiple updates
    console.log(`Change detected: ${filename}`);
    updateFileList(directoryToWatch);
    setTimeout(() => {
      isUpdating = false;
    }, 1000);
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
