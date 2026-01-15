import { Persona } from "../../entities/Persona";
import { IPersonaRepository } from "../../interfaces/repositories/IPersonaRepository";
import { IGetPersonasUseCase } from "../../interfaces/usecases/personas/IGetPersonasUseCase";

export class GetPersonasUseCase implements IGetPersonasUseCase {
  constructor(private personaRepository: IPersonaRepository) {}

  async execute(): Promise<Persona[]> {
    const personas = await this.personaRepository.getAll();

    // Regla de negocio: Los viernes (5) y sábados (6), filtrar mayores de 18
    const today = new Date();
    const dayOfWeek = today.getDay();

    if (dayOfWeek === 5 || dayOfWeek === 6) {
      return personas.filter((persona) => persona.edad > 18);
    }

    return personas;
  }
}
