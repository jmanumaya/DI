import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types";
import { Departamento } from "../../entities/Departamento";
import { IDepartamentoRepository } from "../../interfaces/repositories/IDepartamentoRepository";
import { IUpdateDepartamentoUseCase } from "../../interfaces/useCases/departamentos/IUpdateDepartamentoUseCase";

@injectable()
export class UpdateDepartamentoUseCase implements IUpdateDepartamentoUseCase {
    constructor(
        @inject(TYPES.IDepartamentoRepository) private departamentoRepository: IDepartamentoRepository
    ) { }

    async execute(id: number, departamento: Partial<Departamento>): Promise<Departamento> {
        return await this.departamentoRepository.update(id, departamento);
    }
}
