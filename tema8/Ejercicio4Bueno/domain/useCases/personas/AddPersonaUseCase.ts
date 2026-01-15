import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types";
import { Persona } from "../../entities/Persona";
import { IPersonaRepository } from "../../interfaces/repositories/IPersonaRepository";
import { IAddPersonaUseCase } from "../../interfaces/useCases/personas/IAddPersonaUseCase";

@injectable()
export class AddPersonaUseCase implements IAddPersonaUseCase {
    constructor(
        @inject(TYPES.IPersonaRepository) private personaRepository: IPersonaRepository
    ) { }

    async execute(persona: Omit<Persona, "id">): Promise<Persona> {
        return await this.personaRepository.create(persona);
    }
}
