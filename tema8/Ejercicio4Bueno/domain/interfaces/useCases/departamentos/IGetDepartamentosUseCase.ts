import { DepartamentoDTO } from "../../../dtos/DepartamentoDTO";

export interface IGetDepartamentosUseCase {
    execute(): Promise<DepartamentoDTO[]>;
}
