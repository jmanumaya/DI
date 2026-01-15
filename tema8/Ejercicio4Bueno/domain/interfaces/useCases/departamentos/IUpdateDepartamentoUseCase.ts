import { Departamento } from "../../../entities/Departamento";

export interface IUpdateDepartamentoUseCase {
    execute(id: number, departamento: Partial<Departamento>): Promise<Departamento>;
}
