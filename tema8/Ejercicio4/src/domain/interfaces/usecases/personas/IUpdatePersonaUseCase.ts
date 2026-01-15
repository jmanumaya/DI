import { Persona } from "../../../entities/Persona";

export interface IUpdatePersonaUseCase {
  execute(persona: Persona): Promise<void>;
}
