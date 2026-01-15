import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types";
import { IPersonaRepository } from "../../interfaces/repositories/IPersonaRepository";
import { IDeletePersonaUseCase } from "../../interfaces/useCases/personas/IDeletePersonaUseCase";

@injectable()
export class DeletePersonaUseCase implements IDeletePersonaUseCase {
    constructor(
        @inject(TYPES.IPersonaRepository) private personaRepository: IPersonaRepository
    ) { }

    async execute(id: number): Promise<boolean> {
        // Regla de negocio: El domingo no está permitido eliminar personas
        const today = new Date();
        const dayOfWeek = today.getDay(); // 0 = Domingo

        if (dayOfWeek === 0) {
            throw new Error("No está permitido eliminar personas los domingos");
        }

        return await this.personaRepository.delete(id);
    }
}
