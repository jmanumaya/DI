import { DepartamentoDTO } from "../../domain/dtos/DepartamentoDTO";
import { Departamento } from "../../domain/entities/Departamento";

export class DepartamentoMapper {
  static toDomain(dto: DepartamentoDTO): Departamento {
    return new Departamento(dto.nombre_dpto, dto.id);
  }

  static toDTO(departamento: Departamento): DepartamentoDTO {
    return {
      id: departamento.id || "",
      nombre_dpto: departamento.nombre,
    };
  }
}
