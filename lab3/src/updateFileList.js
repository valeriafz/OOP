const fs = require("fs").promises;
const path = require("path");
const { File, ImageFile, TextFile, ProgramFile } = require("./file");
const Snapshot = require("./snapshot");

async function updateFileList(dirPath, snapshot) {
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

      if (extension === "py") {
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

module.exports = updateFileList;
