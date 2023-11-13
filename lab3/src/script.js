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
    // Check if the file already exists and update it, or add it if it's new
    const existingFileIndex = this.files.findIndex(
      (f) => f.filename === file.filename && f.extension === file.extension
    );

    if (existingFileIndex !== -1) {
      // File exists, update it
      this.files[existingFileIndex] = file;
    } else {
      // File is new, add it
      this.files.push(file);
    }
  }

  async commit(directoryToWatch) {
    this.snapshotTime = new Date();
    this.snapshotFiles = fs.readdirSync(directoryToWatch);
    console.log(`Created snapshot at: ${this.snapshotTime}`);
    await updateFileList(directoryToWatch); // Fix: use await here
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

async function updateFileList(dirPath) {
  function getImageSize(filePath) {
    const sizeOf = require("image-size");
    const dimensions = sizeOf(filePath);
    return `${dimensions.width}x${dimensions.height} pixels`;
  }

  async function getTextFileStats(filePath) {
    try {
      const content = await fs.promises.readFile(filePath, "utf8");

      const lines = content.split("\n");
      const words = content.split(/\s+/).filter(Boolean);
      const charCount = content.length;

      return {
        lineCount: lines.length,
        wordCount: words.length,
        charCount: charCount,
      };
    } catch (error) {
      console.error(`Error reading file: ${filePath}`, error);
      return {
        lineCount: 0,
        wordCount: 0,
        charCount: 0,
      };
    }
  }

  async function getProgramFileStats(filePath, extension) {
    try {
      const content = await fs.promises.readFile(filePath, "utf8");
      const lines = content.split("\n");
      let classCount = 0;
      let methodCount = 0;
      let insideClass = false;

      const methodDeclarationRegex =
        /^\s*(async\s+)?(function\s+\w+\s*\(.*\)|\w+\s*\(.*\)\s*{|\w+\s*\(.*\)\s*=>)/;

      for (const line of lines) {
        const trimmedLine = line.trim();

        // Check for class declarations
        if (trimmedLine.startsWith("class ")) {
          classCount++;
          insideClass = true;
        } else if (insideClass && trimmedLine === "}") {
          insideClass = false;
        }

        // Check for method declarations using regex
        if (insideClass && methodDeclarationRegex.test(trimmedLine)) {
          methodCount++;
        }
      }

      return {
        lineCount: lines.length,
        classCount: classCount,
        methodCount: methodCount,
      };
    } catch (error) {
      console.error(`Error reading file: ${filePath}`, error);
      return {
        lineCount: 0,
        classCount: 0,
        methodCount: 0,
      };
    }
  }

  try {
    const files = await fs.promises.readdir(dirPath);

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stats = await fs.promises.stat(filePath);
      const createdTime = stats.birthtime;
      const updatedTime = stats.mtime;
      const filename = path.basename(file, path.extname(file));
      const extension = path.extname(file).slice(1);

      let fileObj;

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
        const textStats = await getTextFileStats(filePath);
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
        const programStats = await getProgramFileStats(filePath, extension);
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
  } catch (error) {
    console.error("Error updating file list:", error);
  }
}

const directoryToWatch = "../files";
let isUpdating = false; //  prevent multiple updates in a short time

fs.watch(directoryToWatch, async (eventType, filename) => {
  if (filename && !isUpdating) {
    isUpdating = true;
    console.log(`Change detected: ${filename}`);
    try {
      await updateFileList(directoryToWatch);
      console.log("File list updated");
    } catch (error) {
      console.error("Error updating file list:", error);
    } finally {
      isUpdating = false;
      showMenu();
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

  rl.question("Select an option: ", (option) => {
    if (option === "1") {
      snapshot.commit(directoryToWatch);
      showMenu();
    } else if (option === "2") {
      console.log("Files in directory:", fs.readdirSync(directoryToWatch));
      rl.question("Enter filename: ", (filename) => {
        snapshot.info(filename);
        showMenu();
      });
    } else if (option === "3") {
      isUserSelectedOption3 = true;
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
module.exports = updateFileList;
showMenu();
