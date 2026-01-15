import { PersonaDTO } from "../../dtos/PersonaDTO";
import { Persona } from "../../entities/Persona";

// Interfaz del repositorio de Personas
export interface IPersonaRepository {
    getAll(): Promise<PersonaDTO[]>;
    getById(id: number): Promise<PersonaDTO | null>;
    create(persona: Omit<Persona, "id">): Promise<Persona>;
    update(id: number, persona: Partial<Persona>): Promise<Persona>;
    delete(id: number): Promise<boolean>;
}
