import { injectable } from "inversify";
import { IPersonRepository } from "../../domain/repositories/IPersonRepository";
import { Person } from "../../domain/entities/Person";

@injectable()
export class PersonRepositoryEmpty implements IPersonRepository {
  getAll(): Person[] { return []; }
  getById(idPersona: number): Person | null { return null; }
  add(person: Person): void {}
  update(person: Person): void {}
  delete(idPersona: number): void {}
}
