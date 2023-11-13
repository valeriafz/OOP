const fs = require("fs");
const path = require("path");
const { File, ImageFile, TextFile, ProgramFile } = require("./file");

class Snapshot {
  constructor(directoryToWatch) {
    this.directoryToWatch = directoryToWatch;
    this.snapshotTime = null;
    this.files = [];
    this.snapshotFiles = [];
  }

  addFile(file) {
    this.files.push(file);
  }

  async updateFileList() {
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

        // ... (rest of the getProgramFileStats function, unchanged)
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
      const files = await fs.promises.readdir(this.directoryToWatch);

      for (const file of files) {
        const filePath = path.join(this.directoryToWatch, file);
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

        const existingFileIndex = this.files.findIndex(
          (f) => f.filename === fileObj.filename
        );

        if (existingFileIndex !== -1) {
          this.files[existingFileIndex] = fileObj;
        } else {
          this.files.push(fileObj);
        }
      }
    } catch (error) {
      console.error("Error updating file list:", error);
    }
  }

  commit() {
    this.snapshotTime = new Date();
    this.snapshotFiles = fs.readdirSync(this.directoryToWatch);
    console.log(`Created snapshot at: ${this.snapshotTime}`);
    this.updateFileList();
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
          const currentFilePath = path.join(
            this.directoryToWatch,
            `${file.filename}.${file.extension}`
          );

          if (currentFiles.includes(`${file.filename}.${file.extension}`)) {
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
              `File: ${path.basename(currentFile)} - Added since last snapshot`
            );
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

const snapshotInstance = new Snapshot("../files");
snapshotInstance.commit();
module.exports = { Snapshot, updateFileList };
