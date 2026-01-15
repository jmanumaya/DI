import { Departamento } from "../../../entities/Departamento";

export interface IUpdateDepartamentoUseCase {
  execute(departamento: Departamento): Promise<void>;
}
