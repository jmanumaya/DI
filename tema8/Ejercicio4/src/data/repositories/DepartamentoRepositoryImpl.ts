import { DepartamentoDTO } from "../../domain/dtos/DepartamentoDTO";
import { Departamento } from "../../domain/entities/Departamento";
import { IDepartamentoRepository } from "../../domain/interfaces/repositories/IDepartamentoRepository";
import { APIConnection } from "../datasources/api/APIConnection";
import { DepartamentoMapper } from "../mappers/DepartamentoMapper";

export class DepartamentoRepositoryImpl implements IDepartamentoRepository {
  private api = APIConnection.getInstance();

  async getAll(): Promise<Departamento[]> {
    try {
      const response = await this.api.get<DepartamentoDTO[]>("/departamentos");
      return response.data.map((dto) => DepartamentoMapper.toDomain(dto));
    } catch (error) {
      console.error("Error fetching departamentos:", error);
      throw error;
    }
  }

  async getById(id: string): Promise<Departamento | null> {
    try {
      const response = await this.api.get<DepartamentoDTO>(
        `/departamentos/${id}`
      );
      return DepartamentoMapper.toDomain(response.data);
    } catch (error) {
      console.error("Error fetching departamento:", error);
      return null;
    }
  }

  async add(departamento: Departamento): Promise<void> {
    try {
      const dto = DepartamentoMapper.toDTO(departamento);
      await this.api.post("/departamentos", dto);
    } catch (error) {
      console.error("Error adding departamento:", error);
      throw error;
    }
  }

  async update(departamento: Departamento): Promise<void> {
    try {
      const dto = DepartamentoMapper.toDTO(departamento);
      await this.api.put(`/departamentos/${departamento.id}`, dto);
    } catch (error) {
      console.error("Error updating departamento:", error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.api.delete(`/departamentos/${id}`);
    } catch (error) {
      console.error("Error deleting departamento:", error);
      throw error;
    }
  }
}
