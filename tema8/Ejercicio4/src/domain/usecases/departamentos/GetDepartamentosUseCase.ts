import { Departamento } from "../../entities/Departamento";
import { IDepartamentoRepository } from "../../interfaces/repositories/IDepartamentoRepository";
import { IGetDepartamentosUseCase } from "../../interfaces/usecases/departamentos/IGetDepartamentosUseCase";

export class GetDepartamentosUseCase implements IGetDepartamentosUseCase {
  constructor(private departamentoRepository: IDepartamentoRepository) {}

  async execute(): Promise<Departamento[]> {
    return await this.departamentoRepository.getAll();
  }
}
