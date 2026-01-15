import { IPersonaRepository } from "../../interfaces/repositories/IPersonaRepository";
import { IDeletePersonaUseCase } from "../../interfaces/usecases/personas/IDeletePersonaUseCase";

export class DeletePersonaUseCase implements IDeletePersonaUseCase {
  constructor(private personaRepository: IPersonaRepository) {}

  async execute(id: string): Promise<void> {
    // Regla de negocio: Prohibido borrar en domingo (0)
    const today = new Date();
    const dayOfWeek = today.getDay();

    if (dayOfWeek === 0) {
      throw new Error("No se puede eliminar personas los domingos");
    }

    await this.personaRepository.delete(id);
  }
}
