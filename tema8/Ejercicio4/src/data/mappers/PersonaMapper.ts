import { PersonaDTO } from "../../domain/dtos/PersonaDTO";
import { Persona } from "../../domain/entities/Persona";

export class PersonaMapper {
  static toDomain(dto: PersonaDTO): Persona {
    return new Persona(
      dto.nombre_completo,
      dto.edad,
      dto.id_dep,
      dto.foto,
      dto.id
    );
  }

  static toDTO(persona: Persona): PersonaDTO {
    return {
      id: persona.id || "",
      nombre_completo: persona.nombre,
      edad: persona.edad,
      foto: persona.foto || "",
      id_dep: persona.departamentoId,
    };
  }
}
