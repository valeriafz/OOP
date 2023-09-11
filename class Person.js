class Person {
  constructor(name = "Tom", age = 20, job = "accountant") {
    this.name = name;
    this.age = age;
    this.job = job;
  }
}

const personInstance = new Person();
console.log(Object.entries(personInstance));
