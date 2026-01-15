import { Departamento } from "../../../entities/Departamento";

export interface IAddDepartamentoUseCase {
    execute(departamento: Omit<Departamento, "id">): Promise<Departamento>;
}
