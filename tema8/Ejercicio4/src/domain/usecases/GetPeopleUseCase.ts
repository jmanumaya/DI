import { injectable, inject } from "inversify";
import { IGetPeopleUseCase } from "../interfaces/usecases/IGetPeopleUseCase";
import { IPersonRepository } from "../interfaces/repositories/IPersonRepository";
import { Person } from "../entities/Person";
import { TYPES } from "../../core/types";

@injectable()
export class GetPeopleUseCase implements IGetPeopleUseCase {
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
  async execute(): Promise<Person[]> {
    const allPersons = await this._personRepository.getAll();
    
    // Regla de negocio: Los viernes (5) y sábados (6), filtrar mayores de 18
    const today = new Date();
    const dayOfWeek = today.getDay();
    
    if (dayOfWeek === 5 || dayOfWeek === 6) {
      return allPersons.filter(person => person.age > 18);
    }
    
    return allPersons;
  }
  //#endregion
}
