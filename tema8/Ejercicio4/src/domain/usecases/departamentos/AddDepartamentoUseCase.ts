import { Departamento } from "../../entities/Departamento";
import { IDepartamentoRepository } from "../../interfaces/repositories/IDepartamentoRepository";
import { IAddDepartamentoUseCase } from "../../interfaces/usecases/departamentos/IAddDepartamentoUseCase";

export class AddDepartamentoUseCase implements IAddDepartamentoUseCase {
  constructor(private departamentoRepository: IDepartamentoRepository) {}

  async execute(departamento: Departamento): Promise<void> {
    await this.departamentoRepository.add(departamento);
  }
}
