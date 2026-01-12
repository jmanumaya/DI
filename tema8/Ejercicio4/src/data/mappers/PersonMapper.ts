import { Person } from "../../domain/entities/Person";
import { PersonDTO } from "../dtos/PersonDTO";

export class PersonMapper {
  static mapToEntity(dto: PersonDTO): Person {
    return new Person(
      dto.nombre_completo,
      dto.edad,
      dto.id_dep,
      dto.foto,
      dto.id
    );
  }

  static mapToDTO(entity: Person): PersonDTO {
    return {
      id: entity.id || "",
      nombre_completo: entity.name,
      edad: entity.age,
      foto: entity.photoUrl || "",
      id_dep: entity.departmentId,
    };
  }
}