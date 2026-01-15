import { Departamento } from "../../../entities/Departamento";

export interface IGetDepartamentosUseCase {
  execute(): Promise<Departamento[]>;
}
