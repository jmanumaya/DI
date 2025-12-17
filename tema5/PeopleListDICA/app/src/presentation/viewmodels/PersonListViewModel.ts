import { injectable, inject } from "inversify";
import { TYPES } from "../../core/types";
import { IGetPersonListUseCase } from "../../domain/usecases/IGetPersonListUseCase";
import { Person } from "../../domain/entities/Person";

@injectable()
export class PersonListViewModel {
  //#region Propiedades
  private _getPersonListUseCase: IGetPersonListUseCase;
  //#endregion

  //#region Constructor
  constructor(
    @inject(TYPES.IGetPersonListUseCase)
    getPersonListUseCase: IGetPersonListUseCase
  ) {
    this._getPersonListUseCase = getPersonListUseCase;
  }
  //#endregion

  //#region Métodos públicos
  loadPeople(): Person[] {
    return this._getPersonListUseCase.execute();
  }

  getPeopleNames(): string[] {
    return this.loadPeople().map(p => p.fullName);
  }
  //#endregion  
}
