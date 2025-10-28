import { injectable } from "inversify";
import { IPersonRepository } from "../../domain/repositories/IPersonRepository";
import { Person } from "../../domain/entities/Person";

@injectable()
export class PersonRepository100 implements IPersonRepository {
  private _people: Person[] = [];

  constructor() {
    for (let i = 1; i <= 100; i++) {
      this._people.push(new Person(i, `Nombre${i}`, `Apellido${i}`, new Date(1990, 0, i)));
    }
  }

  getAll(): Person[] { return this._people; }
  getById(idPersona: number): Person | null { return this._people.find(p => p.idPersona === idPersona) || null; }
  add(person: Person): void { this._people.push(person); }
  update(person: Person): void {
    const index = this._people.findIndex(p => p.idPersona === person.idPersona);
    if (index !== -1) this._people[index] = person;
  }
  delete(idPersona: number): void { this._people = this._people.filter(p => p.idPersona !== idPersona); }
}
