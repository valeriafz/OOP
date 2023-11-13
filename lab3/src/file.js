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

module.exports = {
  File,
  ImageFile,
  TextFile,
  ProgramFile,
};
