import { Persona } from "../../../entities/Persona";

export interface IAddPersonaUseCase {
    execute(persona: Omit<Persona, "id">): Promise<Persona>;
}
