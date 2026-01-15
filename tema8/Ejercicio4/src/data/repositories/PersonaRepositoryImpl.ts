import { PersonaDTO } from "../../domain/dtos/PersonaDTO";
import { Persona } from "../../domain/entities/Persona";
import { IPersonaRepository } from "../../domain/interfaces/repositories/IPersonaRepository";
import { APIConnection } from "../datasources/api/APIConnection";
import { PersonaMapper } from "../mappers/PersonaMapper";

export class PersonaRepositoryImpl implements IPersonaRepository {
  private api = APIConnection.getInstance();

  async getAll(): Promise<Persona[]> {
    try {
      const response = await this.api.get<PersonaDTO[]>("/personas");
      return response.data.map((dto) => PersonaMapper.toDomain(dto));
    } catch (error) {
      console.error("Error fetching personas:", error);
      throw error;
    }
  }

  async getById(id: string): Promise<Persona | null> {
    try {
      const response = await this.api.get<PersonaDTO>(`/personas/${id}`);
      return PersonaMapper.toDomain(response.data);
    } catch (error) {
      console.error("Error fetching persona:", error);
      return null;
    }
  }

  async add(persona: Persona): Promise<void> {
    try {
      const dto = PersonaMapper.toDTO(persona);
      await this.api.post("/personas", dto);
    } catch (error) {
      console.error("Error adding persona:", error);
      throw error;
    }
  }

  async update(persona: Persona): Promise<void> {
    try {
      const dto = PersonaMapper.toDTO(persona);
      await this.api.put(`/personas/${persona.id}`, dto);
    } catch (error) {
      console.error("Error updating persona:", error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.api.delete(`/personas/${id}`);
    } catch (error) {
      console.error("Error deleting persona:", error);
      throw error;
    }
  }
}
