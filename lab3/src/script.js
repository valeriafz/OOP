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
    this.snapshotFiles = [];
  }

  addFile(file) {
    this.files.push(file);
  }

  commit() {
    this.snapshotTime = new Date();
    this.snapshotFiles = fs.readdirSync(directoryToWatch);
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

  status(isUserSelectedOption3) {
    if (!this.snapshotTime && !isUserSelectedOption3) {
      if (isUserSelectedOption3) {
        console.log(
          "No snapshot has been created. Please use option 1 (commit) first."
        );
      }
    } else {
      const currentFiles = fs.readdirSync(directoryToWatch);
      if (!isUserSelectedOption3) {
        for (const file of this.files) {
          console.log(`File: ${file.filename}.${file.extension} - No change`);
        }
        for (const currentFile of currentFiles) {
          if (!this.snapshotFiles.includes(currentFile)) {
            console.log(
              `File: ${path.basename(currentFile)} - Added since last snapshot`
            );
          }
        }
      } else {
        if (currentFiles.length === 0) {
          console.log("No files in the directory.");
        } else {
          for (const file of this.files) {
            const currentFilePath = path.join(
              directoryToWatch,
              file.filename + "." + file.extension
            );
            if (currentFiles.includes(file.filename + "." + file.extension)) {
              const currentStats = fs.statSync(currentFilePath);
              if (currentStats.mtime > this.snapshotTime) {
                console.log(
                  `File: ${file.filename}.${file.extension} - Changed since last snapshot`
                );
              } else {
                console.log(
                  `File: ${file.filename}.${file.extension} - No change`
                );
              }
            } else {
              console.log(
                `File: ${file.filename}.${file.extension} - Deleted since last snapshot`
              );
            }
          }
          for (const currentFile of currentFiles) {
            if (!this.snapshotFiles.includes(currentFile)) {
              console.log(
                `File: ${path.basename(
                  currentFile
                )} - Added since last snapshot`
              );
            }
          }
        }
      }
    }
  }

  checkFileStatus(filename, currentFiles, snapshotTime) {
    const currentFile = currentFiles.find((file) => file === filename);
    if (currentFile) {
      const currentStats = fs.statSync(
        path.join(directoryToWatch, currentFile)
      );
      if (currentStats.mtime > snapshotTime) {
        return `File: ${filename} - Changed since last snapshot`;
      } else {
        return `File: ${filename} - No change`;
      }
    } else {
      return `File: ${filename} - Added since last snapshot`;
    }
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const snapshot = new Snapshot();

function updateFileList(dirPath) {
  function getImageSize(filePath) {
    const sizeOf = require("image-size");
    const dimensions = sizeOf(filePath);
    return `${dimensions.width}x${dimensions.height} pixels`;
  }

  function getTextFileStats(filePath) {
    const content = fs.readFileSync(filePath, "utf8");
    const lines = content.split("\n");
    const words = content.split(/\s+/).filter(Boolean);
    const charCount = content.length;

    return {
      lineCount: lines.length,
      wordCount: words.length,
      charCount: charCount,
    };
  }

  function getProgramFileStats(filePath, extension) {
    if (extension === "py") {
      const content = fs.readFileSync(filePath, "utf8");
      const lines = content.split("\n");
      let classCount = 0;
      let methodCount = 0;
      let insideClass = false;

      for (const line of lines) {
        if (line.trim().startsWith("class ")) {
          classCount++;
          insideClass = true;
        } else if (insideClass && line.trim().startsWith("def ")) {
          methodCount++;
        } else if (insideClass && line.trim() === "") {
          insideClass = false;
        }
      }

      return {
        lineCount: lines.length,
        classCount: classCount,
        methodCount: methodCount,
      };
    } else if (extension === "java") {
      const content = fs.readFileSync(filePath, "utf8");
      const lines = content.split("\n");
      let classCount = 0;
      let methodCount = 0;
      let insideClass = false;

      for (const line of lines) {
        if (line.trim().startsWith("class ")) {
          classCount++;
          insideClass = true;
        } else if (
          insideClass &&
          (line.trim().startsWith("public ") ||
            line.trim().startsWith("private "))
        ) {
          methodCount++;
        } else if (insideClass && line.trim() === "}") {
          insideClass = false;
        }
      }

      return {
        lineCount: lines.length,
        classCount: classCount,
        methodCount: methodCount,
      };
    } else if (extension === "js") {
      const content = fs.readFileSync(filePath, "utf8");
      const lines = content.split("\n");
      let classCount = 0;
      let methodCount = 0;
      let insideClass = false;

      for (const line of lines) {
        if (line.trim().startsWith("class ")) {
          classCount++;
          insideClass = true;
        } else if (
          insideClass &&
          (line.trim().startsWith("constructor(") ||
            line.trim().startsWith("function "))
        ) {
          methodCount++;
        } else if (insideClass && line.trim() === "}") {
          insideClass = false;
        }
      }

      return {
        lineCount: lines.length,
        classCount: classCount,
        methodCount: methodCount,
      };
    }

    return {
      lineCount: 0,
      classCount: 0,
      methodCount: 0,
    };
  }

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
  //snapshot.status();
}

const directoryToWatch = "../files";
let isUpdating = false; //  prevent multiple updates in a short time

fs.watch(directoryToWatch, (eventType, filename) => {
  if (filename && !isUpdating) {
    isUpdating = true;
    //console.log(`Change detected: ${filename}`);
    setTimeout(() => {
      updateFileList(directoryToWatch);
      isUpdating = false;
    }, 1000);
  }
});

// updateFileList(directoryToWatch);

function showMenu() {
  let isUserSelectedOption3 = false;
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
      console.log("Files in directory:", fs.readdirSync(directoryToWatch));
      rl.question("Enter filename: ", (filename) => {
        snapshot.info(filename);
        showMenu();
      });
    } else if (option === "3") {
      // if (isUpdating) {
      //   isUpdating = false; // Enable automatic updates for "Status" option
      //   updateFileList(directoryToWatch);
      // }
      // snapshot.status();
      // showMenu();
      isUserSelectedOption3 = true; // Set the variable when user selects option 3
      snapshot.status(isUserSelectedOption3);
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
