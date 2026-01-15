import { Persona } from "../../../entities/Persona";

export interface IAddPersonaUseCase {
  execute(persona: Persona): Promise<void>;
}
