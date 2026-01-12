import { Department } from "../../entities/Department";

export interface ISaveDepartmentUseCase {
  execute(department: Department): Promise<void>;
}