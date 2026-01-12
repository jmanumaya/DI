
export class Person {
  id?: string;
  name: string;
  age: number;
  photoUrl?: string;
  departmentId: string;

  constructor(
    name: string,
    age: number,
    departmentId: string,
    photoUrl?: string,
    id?: string
  ) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.photoUrl = photoUrl;
    this.departmentId = departmentId;
  }
}