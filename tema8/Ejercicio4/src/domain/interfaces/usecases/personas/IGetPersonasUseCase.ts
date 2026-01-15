import { Persona } from "../../../entities/Persona";

export interface IGetPersonasUseCase {
  execute(): Promise<Persona[]>;
}
