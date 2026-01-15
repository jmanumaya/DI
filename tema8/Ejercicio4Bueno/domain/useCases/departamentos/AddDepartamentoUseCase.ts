import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types";
import { Departamento } from "../../entities/Departamento";
import { IDepartamentoRepository } from "../../interfaces/repositories/IDepartamentoRepository";
import { IAddDepartamentoUseCase } from "../../interfaces/useCases/departamentos/IAddDepartamentoUseCase";

@injectable()
export class AddDepartamentoUseCase implements IAddDepartamentoUseCase {
    constructor(
        @inject(TYPES.IDepartamentoRepository) private departamentoRepository: IDepartamentoRepository
    ) { }

    async execute(departamento: Omit<Departamento, "id">): Promise<Departamento> {
        return await this.departamentoRepository.create(departamento);
    }
}
