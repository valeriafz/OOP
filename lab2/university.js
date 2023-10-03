const StudyField = {
  MECHANICAL_ENGINEERING: "Mechanical Engineering",
  SOFTWARE_ENGINEERING: "Software Engineering",
  FOOD_TECHNOLOGY: "Food Technology",
  URBANISM_ARCHITECTURE: "Urbanism and Architecture",
  VETERINARY_MEDICINE: "Veterinary Medicine",
};

class Student {
  constructor(firstname, lastname, email, enrollmentDate, dateOfBirth) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.enrollmentDate = enrollmentDate;
    this.dateOfBirth = dateOfBirth;
  }
}

class Faculty {
  constructor(name, abbreviation, studyField) {
    this.name = name;
    this.abbreviation = abbreviation;
    this.studyField = studyField;
    this.students = [];
  }

  addStudent(student) {
    this.students.push(student);
  }

  graduateStudent(studentEmail) {
    this.students = this.students.filter(
      (student) => student.email !== studentEmail
    );
  }
}

class University {
  constructor() {
    this.faculties = [];
  }

  createFaculty(name, abbreviation, studyField) {
    const faculty = new Faculty(name, abbreviation, studyField);
    this.faculties.push(faculty);
  }

  findFacultyByStudentEmail(studentEmail) {
    for (const faculty of this.faculties) {
      if (faculty.students.some((student) => student.email === studentEmail)) {
        return faculty;
      }
    }
    return null;
  }

  displayFaculties() {
    for (const faculty of this.faculties) {
      console.log(
        `Faculty: ${faculty.name} (${faculty.abbreviation}) - Field: ${faculty.studyField}`
      );
    }
  }

  displayFacultiesByField(field) {
    for (const faculty of this.faculties) {
      if (faculty.studyField === field) {
        console.log(`Faculty: ${faculty.name} (${faculty.abbreviation})`);
      }
    }
  }

  displayEnrolledStudents(faculty) {
    console.log(
      `Enrolled students in ${faculty.name} (${faculty.abbreviation}):`
    );
    for (const student of faculty.students) {
      console.log(
        `${student.firstname} ${student.lastname} (${student.email})`
      );
    }
  }

  displayGraduates(faculty) {
    console.log(`Graduates from ${faculty.name} (${faculty.abbreviation}):`);
    for (const student of faculty.students) {
      console.log(
        `${student.firstname} ${student.lastname} (${student.email})`
      );
    }
  }

  isStudentInFaculty(studentEmail, faculty) {
    return faculty.students.some((student) => student.email === studentEmail);
  }
}

const university = new University();

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function displayMenu() {
  console.log(`
    TUM Board - Main Menu
  
    Faculty Operations:
    1. Create and assign a student to a faculty
    2. Graduate a student from a faculty
    3. Display current enrolled students
    4. Display graduates
    5. Check if a student belongs to a faculty
  
    General Operations:
    6. Create a new faculty
    7. Search which faculty a student belongs to
    8. Display University faculties
    9. Display faculties belonging to a field
  
    0. Exit
    `);
}

displayMenu();

rl.on("line", (input) => {
  switch (input.trim()) {
    case "1":
      // Create and assign a student to a faculty
      console.log("Enter student details:");
      rl.question("First Name: ", (firstname) => {
        rl.question("Last Name: ", (lastname) => {
          rl.question("Email: ", (email) => {
            rl.question("Enrollment Date: ", (enrollmentDate) => {
              rl.question("Date of Birth: ", (dateOfBirth) => {
                const student = new Student(
                  firstname,
                  lastname,
                  email,
                  enrollmentDate,
                  dateOfBirth
                );
                console.log("Faculties:");
                university.faculties.forEach((faculty, index) => {
                  console.log(
                    `${index + 1}. ${faculty.name} (${faculty.abbreviation})`
                  );
                });
                rl.question(
                  "Select a faculty (Enter the number): ",
                  (facultyIndex) => {
                    const faculty =
                      university.faculties[parseInt(facultyIndex) - 1];
                    if (faculty) {
                      faculty.addStudent(student);
                      console.log(
                        `Student ${student.firstname} ${student.lastname} assigned to ${faculty.name} (${faculty.abbreviation}).`
                      );
                    } else {
                      console.log("Invalid faculty selection.");
                    }
                    displayMenu();
                  }
                );
              });
            });
          });
        });
      });
      break;

    case "2":
      // Graduate a student from a faculty
      console.log("Enter student email to graduate:");
      rl.question("Student Email: ", (studentEmail) => {
        const faculty = university.findFacultyByStudentEmail(studentEmail);
        if (faculty) {
          faculty.graduateStudent(studentEmail);
          console.log(
            `Student with email ${studentEmail} has graduated from ${faculty.name} (${faculty.abbreviation}).`
          );
        } else {
          console.log("Student not found in any faculty.");
        }
        displayMenu();
      });
      break;

    case "3":
      // Display current enrolled students
      console.log("Faculties:");
      university.faculties.forEach((faculty, index) => {
        console.log(`${index + 1}. ${faculty.name} (${faculty.abbreviation})`);
      });
      rl.question("Select a faculty (Enter the number): ", (facultyIndex) => {
        const faculty = university.faculties[parseInt(facultyIndex) - 1];
        if (faculty) {
          university.displayEnrolledStudents(faculty);
        } else {
          console.log("Invalid faculty selection.");
        }
        displayMenu();
      });
      break;

    case "4":
      // Display graduates
      console.log("Faculties:");
      university.faculties.forEach((faculty, index) => {
        console.log(`${index + 1}. ${faculty.name} (${faculty.abbreviation})`);
      });
      rl.question("Select a faculty (Enter the number): ", (facultyIndex) => {
        const faculty = university.faculties[parseInt(facultyIndex) - 1];
        if (faculty) {
          university.displayGraduates(faculty);
        } else {
          console.log("Invalid faculty selection.");
        }
        displayMenu();
      });
      break;

    case "5":
      // Check if a student belongs to a faculty
      console.log("Enter student email to check:");
      rl.question("Student Email: ", (studentEmail) => {
        console.log("Faculties:");
        university.faculties.forEach((faculty, index) => {
          console.log(
            `${index + 1}. ${faculty.name} (${faculty.abbreviation})`
          );
        });
        rl.question("Select a faculty (Enter the number): ", (facultyIndex) => {
          const faculty = university.faculties[parseInt(facultyIndex) - 1];
          if (faculty) {
            const isInFaculty = university.isStudentInFaculty(
              studentEmail,
              faculty
            );
            if (isInFaculty) {
              console.log(
                `Student with email ${studentEmail} belongs to ${faculty.name} (${faculty.abbreviation}).`
              );
            } else {
              console.log(
                `Student with email ${studentEmail} does not belong to ${faculty.name} (${faculty.abbreviation}).`
              );
            }
          } else {
            console.log("Invalid faculty selection.");
          }
          displayMenu();
        });
      });
      break;

    case "6":
      // Create a new faculty
      console.log("Enter faculty details:");
      rl.question("Name: ", (name) => {
        rl.question("Abbreviation: ", (abbreviation) => {
          console.log("Select a study field:");
          for (const field in StudyField) {
            console.log(`${StudyField[field]} - ${field}`);
          }
          rl.question(
            "Enter the field (e.g., mechanical_engineering): ",
            (field) => {
              if (StudyField[field]) {
                university.createFaculty(name, abbreviation, StudyField[field]);
                console.log(`Faculty ${name} (${abbreviation}) created.`);
              } else {
                console.log("Invalid study field selection.");
              }
              displayMenu();
            }
          );
        });
      });
      break;

    case "7":
      // Search which faculty a student belongs to
      console.log("Enter student email to search faculty:");
      rl.question("Student Email: ", (studentEmail) => {
        const faculty = university.findFacultyByStudentEmail(studentEmail);
        if (faculty) {
          console.log(
            `Student with email ${studentEmail} belongs to ${faculty.name} (${faculty.abbreviation}).`
          );
        } else {
          console.log("Student not found in any faculty.");
        }
        displayMenu();
      });
      break;

    case "8":
      // Display University faculties
      console.log("University Faculties:");
      university.displayFaculties();
      displayMenu();
      break;

    case "9":
      // Display faculties belonging to a field
      console.log("Select a study field:");
      for (const field in StudyField) {
        console.log(`${StudyField[field]} - ${field}`);
      }
      rl.question(
        "Enter the field (e.g., mechanical_engineering): ",
        (field) => {
          if (StudyField[field]) {
            console.log(`Faculties in ${StudyField[field]} field:`);
            university.displayFacultiesByField(StudyField[field]);
          } else {
            console.log("Invalid study field selection.");
          }
          displayMenu();
        }
      );
      break;

    case "0":
      // Exit
      rl.close();
      break;

    default:
      console.log("Invalid choice. Please select a valid option.");
      displayMenu();
      break;
  }
});
