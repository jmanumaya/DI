import { Department } from "../../entities/Department";

export interface IDepartmentRepository {
  getAll(): Promise<Department[]>;
  save(department: Department): Promise<void>;
  delete(id: string): Promise<void>;
}
