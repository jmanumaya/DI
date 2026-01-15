import { Persona } from "../../entities/Persona";
import { IPersonaRepository } from "../../interfaces/repositories/IPersonaRepository";
import { IAddPersonaUseCase } from "../../interfaces/usecases/personas/IAddPersonaUseCase";

export class AddPersonaUseCase implements IAddPersonaUseCase {
  constructor(private personaRepository: IPersonaRepository) {}

  async execute(persona: Persona): Promise<void> {
    await this.personaRepository.add(persona);
  }
}
