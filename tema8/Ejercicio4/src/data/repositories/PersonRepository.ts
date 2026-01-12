import { injectable } from "inversify";
import axios from "axios";
import { IPersonRepository } from "../../domain/interfaces/repositories/IPersonRepository";
import { Person } from "../../domain/entities/Person";
import { PersonDTO } from "../dtos/PersonDTO";
import { PersonMapper } from "../mappers/PersonMapper";

const API_BASE_URL = "https://josemanuel-cxevfcgaewgadebz.spaincentral-01.azurewebsites.net/api/";

@injectable()
export class PersonRepository implements IPersonRepository {
  async getAll(): Promise<Person[]> {
    try {
      const response = await axios.get<PersonDTO[]>(`${API_BASE_URL}/personas`);
      return response.data.map((dto) => PersonMapper.mapToEntity(dto));
    } catch (error) {
      console.error("Error fetching persons:", error);
      throw error;
    }
  }

  async save(person: Person): Promise<void> {
    try {
      const dto = PersonMapper.mapToDTO(person);
      
      if (person.id) {
        // Actualizar persona existente
        await axios.put(`${API_BASE_URL}/personas/${person.id}`, dto);
      } else {
        // Crear nueva persona
        await axios.post(`${API_BASE_URL}/personas`, dto);
      }
    } catch (error) {
      console.error("Error saving person:", error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/personas/${id}`);
    } catch (error) {
      console.error("Error deleting person:", error);
      throw error;
    }
  }
}
