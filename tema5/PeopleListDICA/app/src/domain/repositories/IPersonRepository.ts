import { Person } from "../entities/Person";

export interface IPersonRepository {
  //#region Métodos de obtención
  getAll(): Person[];
  getById(idPersona: number): Person | null;
  //#endregion

  //#region Métodos de modificación
  add(person: Person): void;
  update(person: Person): void;
  delete(idPersona: number): void;
  //#endregion
}
