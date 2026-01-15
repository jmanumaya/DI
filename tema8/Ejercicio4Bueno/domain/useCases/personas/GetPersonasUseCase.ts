import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types";
import { PersonaDTO } from "../../dtos/PersonaDTO";
import { IPersonaRepository } from "../../interfaces/repositories/IPersonaRepository";
import { IGetPersonasUseCase } from "../../interfaces/useCases/personas/IGetPersonasUseCase";

@injectable()
export class GetPersonasUseCase implements IGetPersonasUseCase {
    constructor(
        @inject(TYPES.IPersonaRepository) private personaRepository: IPersonaRepository
    ) { }

    async execute(): Promise<PersonaDTO[]> {
        const personas = await this.personaRepository.getAll();

        // Regla de negocio: Los viernes y sábados solo mostrar mayores de 18
        const today = new Date();
        const dayOfWeek = today.getDay(); // 0 = Domingo, 5 = Viernes, 6 = Sábado

        if (dayOfWeek === 5 || dayOfWeek === 6) {
            return personas.filter(persona => {
                const birthDate = new Date(persona.birth);
                const age = this.calculateAge(birthDate);
                return age > 18;
            });
        }

        return personas;
    }

    private calculateAge(birthDate: Date): number {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    }
}
