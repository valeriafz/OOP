const fs = require("fs");
const path = require("path");

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

class Snapshot {
  constructor() {
    this.snapshotTime = new Date();
    this.files = {};
  }

  commit() {
    this.snapshotTime = new Date();
    console.log(`Created snapshot at: ${this.snapshotTime}`);
  }

  addFile(file) {
    this.files[file.filename] = file;
  }

  info(filename) {
    const file = this.files[filename];
    if (file) {
      file.info();
    } else {
      console.log(`File not found: ${filename}`);
    }
  }

  status() {
    console.log(`Snapshot time: ${this.snapshotTime}`);
    for (const filename in this.files) {
      const file = this.files[filename];
      file.status(this.snapshotTime);
    }
  }
}

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
      const fileObj = new File(filename, extension, createdTime, updatedTime);
      snapshot.addFile(fileObj);
    }

    snapshot.status();
  });
}

// Set the directory path to monitor (change this to your lab3 folder)
const directoryToWatch = "./lab3";

// Watch for changes in the directory
fs.watch(directoryToWatch, (eventType, filename) => {
  if (filename) {
    console.log(`Change detected: ${filename}`);
    updateFileList(directoryToWatch);
  }
});

updateFileList(directoryToWatch);
