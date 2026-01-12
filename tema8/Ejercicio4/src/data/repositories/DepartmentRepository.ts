import { injectable } from "inversify";
import axios from "axios";
import { IDepartmentRepository } from "../../domain/interfaces/repositories/IDepartmentRepository";
import { Department } from "../../domain/entities/Department";
import { DepartmentDTO } from "../dtos/DepartmentDTO";
import { DepartmentMapper } from "../mappers/DepartmentMapper";

const API_BASE_URL = "https://josemanuel-cxevfcgaewgadebz.spaincentral-01.azurewebsites.net/api/";

@injectable()
export class DepartmentRepository implements IDepartmentRepository {
  async getAll(): Promise<Department[]> {
    try {
      const response = await axios.get<DepartmentDTO[]>(`${API_BASE_URL}/departamentos`);
      return response.data.map((dto) => DepartmentMapper.mapToEntity(dto));
    } catch (error) {
      console.error("Error fetching departments:", error);
      throw error;
    }
  }

  async save(department: Department): Promise<void> {
    try {
      const dto = DepartmentMapper.mapToDTO(department);
      
      if (department.id) {
        // Actualizar departamento existente
        await axios.put(`${API_BASE_URL}/departamentos/${department.id}`, dto);
      } else {
        // Crear nuevo departamento
        await axios.post(`${API_BASE_URL}/departamentos`, dto);
      }
    } catch (error) {
      console.error("Error saving department:", error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/departamentos/${id}`);
    } catch (error) {
      console.error("Error deleting department:", error);
      throw error;
    }
  }
}
