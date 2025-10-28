import { Person } from "../entities/Person";

export interface IGetPersonListUseCase {
  /**
   * Ejecuta el caso de uso para obtener la lista de personas.
   */
  execute(): Person[];
}
