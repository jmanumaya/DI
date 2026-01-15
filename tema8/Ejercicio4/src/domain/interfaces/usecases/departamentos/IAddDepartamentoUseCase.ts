import { Departamento } from "../../../entities/Departamento";

export interface IAddDepartamentoUseCase {
  execute(departamento: Departamento): Promise<void>;
}
