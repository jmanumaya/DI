import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types";
import { DepartamentoDTO } from "../../dtos/DepartamentoDTO";
import { IDepartamentoRepository } from "../../interfaces/repositories/IDepartamentoRepository";
import { IGetDepartamentosUseCase } from "../../interfaces/useCases/departamentos/IGetDepartamentosUseCase";

@injectable()
export class GetDepartamentosUseCase implements IGetDepartamentosUseCase {
    constructor(
        @inject(TYPES.IDepartamentoRepository) private departamentoRepository: IDepartamentoRepository
    ) { }

    async execute(): Promise<DepartamentoDTO[]> {
        return await this.departamentoRepository.getAll();
    }
}
