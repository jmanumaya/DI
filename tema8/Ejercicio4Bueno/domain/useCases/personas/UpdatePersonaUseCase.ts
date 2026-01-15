import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types";
import { Persona } from "../../entities/Persona";
import { IPersonaRepository } from "../../interfaces/repositories/IPersonaRepository";
import { IUpdatePersonaUseCase } from "../../interfaces/useCases/personas/IUpdatePersonaUseCase";

@injectable()
export class UpdatePersonaUseCase implements IUpdatePersonaUseCase {
    constructor(
        @inject(TYPES.IPersonaRepository) private personaRepository: IPersonaRepository
    ) { }

    async execute(id: number, persona: Partial<Persona>): Promise<Persona> {
        return await this.personaRepository.update(id, persona);
    }
}
