// src/domain/usecases/SavePersonUseCase.ts

import { injectable, inject } from "inversify";
import { ISavePersonUseCase } from "../interfaces/usecases/ISavePersonUseCase";
import { IPersonRepository } from "../interfaces/repositories/IPersonRepository";
import { Person } from "../entities/Person";
import { TYPES } from "../../core/types";

@injectable()
export class SavePersonUseCase implements ISavePersonUseCase {
  //#region Propiedades
  private _personRepository: IPersonRepository;
  //#endregion

  //#region Constructor
  constructor(
    @inject(TYPES.IPersonRepository) personRepository: IPersonRepository
  ) {
    this._personRepository = personRepository;
  }
  //#endregion

  //#region Métodos públicos
  async execute(person: Person): Promise<void> {
    await this._personRepository.save(person);
  }
  //#endregion
}
