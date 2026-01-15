import { Departamento } from "../../entities/Departamento";
import { IDepartamentoRepository } from "../../interfaces/repositories/IDepartamentoRepository";
import { IUpdateDepartamentoUseCase } from "../../interfaces/usecases/departamentos/IUpdateDepartamentoUseCase";

export class UpdateDepartamentoUseCase implements IUpdateDepartamentoUseCase {
  constructor(private departamentoRepository: IDepartamentoRepository) {}

  async execute(departamento: Departamento): Promise<void> {
    await this.departamentoRepository.update(departamento);
  }
}
