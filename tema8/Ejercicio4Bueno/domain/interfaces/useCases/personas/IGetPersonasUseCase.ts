import { PersonaDTO } from "../../../dtos/PersonaDTO";

export interface IGetPersonasUseCase {
    execute(): Promise<PersonaDTO[]>;
}
