import { injectable, inject } from "inversify";
import { IPersonRepository } from "../repositories/IPersonRepository";
import { IGetPersonListUseCase } from "./IGetPersonListUseCase";
import { Person } from "../entities/Person";
import { TYPES } from "../../core/types";

@injectable()
export class GetPersonListUseCase implements IGetPersonListUseCase {
  //#region Propiedades
  private _personRepository: IPersonRepository;
  //#endregion

  //#region Constructor
  constructor(@inject(TYPES.IPersonRepository) personRepository: IPersonRepository) {
    this._personRepository = personRepository;
  }
  //#endregion

  //#region Métodos públicos
  execute(): Person[] {
    return this._personRepository.getAll();
  }
  //#endregion
}
