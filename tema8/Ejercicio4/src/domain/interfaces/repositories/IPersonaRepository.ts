import { Persona } from "../../entities/Persona";

export interface IPersonaRepository {
  getAll(): Promise<Persona[]>;
  getById(id: string): Promise<Persona | null>;
  add(persona: Persona): Promise<void>;
  update(persona: Persona): Promise<void>;
  delete(id: string): Promise<void>;
}
