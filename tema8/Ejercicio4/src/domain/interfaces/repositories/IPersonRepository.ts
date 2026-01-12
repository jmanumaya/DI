import { Person } from "../../entities/Person";

export interface IPersonRepository {
  getAll(): Promise<Person[]>;
  save(person: Person): Promise<void>;
  delete(id: string): Promise<void>;
}