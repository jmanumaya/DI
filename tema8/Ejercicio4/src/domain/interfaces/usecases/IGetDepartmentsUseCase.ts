import { Department } from "../../entities/Department";

export interface IGetDepartmentsUseCase {
  execute(): Promise<Department[]>;
}