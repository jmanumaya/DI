import { Department } from "../../domain/entities/Department";
import { DepartmentDTO } from "../dtos/DepartmentDTO";

export class DepartmentMapper {
  static mapToEntity(dto: DepartmentDTO): Department {
    return new Department(dto.nombre_dpto, dto.id);
  }

  static mapToDTO(entity: Department): DepartmentDTO {
    return {
      id: entity.id || "",
      nombre_dpto: entity.name,
    };
  }
}