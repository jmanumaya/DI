import { IDepartamentoRepository } from "../../interfaces/repositories/IDepartamentoRepository";
import { IDeleteDepartamentoUseCase } from "../../interfaces/usecases/departamentos/IDeleteDepartamentoUseCase";

export class DeleteDepartamentoUseCase implements IDeleteDepartamentoUseCase {
  constructor(private departamentoRepository: IDepartamentoRepository) {}

  async execute(id: string): Promise<void> {
    await this.departamentoRepository.delete(id);
  }
}
