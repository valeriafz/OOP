const fs = require("fs");
const path = require("path");
const { updateFileList } = require("./updateFileList");

class Snapshot {
  constructor(directoryToWatch) {
    this.snapshotTime = null;
    this.files = [];
    this.snapshotFiles = [];
    this.directoryToWatch = directoryToWatch;
  }

  addFile(file) {
    const existingFileIndex = this.files.findIndex(
      (f) => f.filename === file.filename && f.extension === file.extension
    );

    if (existingFileIndex !== -1) {
      this.files[existingFileIndex] = file;
    } else {
      this.files.push(file);
    }
  }

  async commit(directoryToWatch) {
    this.snapshotTime = new Date();
    this.snapshotFiles = fs.readdirSync(this.directoryToWatch);
    console.log(`Created snapshot at: ${this.snapshotTime}`);
    let files = await updateFileList(this.directoryToWatch);
    files.forEach((file) => {
      this.addFile(file);
    });
  }

  info(filename) {
    console.log("Searching for:", filename);
    const file = this.files.find(
      (f) =>
        f.filename.toLowerCase() === filename.toLowerCase() ||
        path.basename(f.filename, path.extname(f.filename)).toLowerCase() ===
          filename.toLowerCase()
    );

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
      const currentFiles = fs.readdirSync(this.directoryToWatch);
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
            // if (!this.snapshotFiles.includes(file.filename)) continue;
            const currentFilePath = path.join(
              this.directoryToWatch,
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
        path.join(this.directoryToWatch, currentFile)
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

module.exports = Snapshot;
