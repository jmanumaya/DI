import { inject, injectable } from "inversify";
import { TYPES } from "../../core/types";
import { IPersonRepository } from "../interfaces/repositories/IPersonRepository";
import { IDeletePersonUseCase } from "../interfaces/usecases/IDeletePersonUseCase";

@injectable()
export class DeletePersonUseCase implements IDeletePersonUseCase {
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
  async execute(id: string): Promise<void> {
    // Regla de negocio: Prohibido borrar en domingo
    const day = new Date().getDay(); // 0 domingo
    if (day === 0) {
      throw new Error("Prohibido borrar en domingo");
    }
    await this._personRepository.delete(id);
  }
  //#endregion
}