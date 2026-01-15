import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types";
import { IDepartamentoRepository } from "../../interfaces/repositories/IDepartamentoRepository";
import { IDeleteDepartamentoUseCase } from "../../interfaces/useCases/departamentos/IDeleteDepartamentoUseCase";

@injectable()
export class DeleteDepartamentoUseCase implements IDeleteDepartamentoUseCase {
    constructor(
        @inject(TYPES.IDepartamentoRepository) private departamentoRepository: IDepartamentoRepository
    ) { }

    async execute(id: number): Promise<boolean> {
        return await this.departamentoRepository.delete(id);
    }
}
