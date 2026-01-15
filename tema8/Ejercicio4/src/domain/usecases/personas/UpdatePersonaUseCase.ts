import { Persona } from "../../entities/Persona";
import { IPersonaRepository } from "../../interfaces/repositories/IPersonaRepository";
import { IUpdatePersonaUseCase } from "../../interfaces/usecases/personas/IUpdatePersonaUseCase";

export class UpdatePersonaUseCase implements IUpdatePersonaUseCase {
  constructor(private personaRepository: IPersonaRepository) {}

  async execute(persona: Persona): Promise<void> {
    await this.personaRepository.update(persona);
  }
}
