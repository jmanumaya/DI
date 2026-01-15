import { Persona } from "../../../entities/Persona";

export interface IUpdatePersonaUseCase {
    execute(id: number, persona: Partial<Persona>): Promise<Persona>;
}
