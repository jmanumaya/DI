import { injectable, inject } from "inversify";
import { ISaveDepartmentUseCase } from "../interfaces/usecases/ISaveDepartmentUseCase";
import { IDepartmentRepository } from "../interfaces/repositories/IDepartmentRepository";
import { Department } from "../entities/Department";
import { TYPES } from "../../core/types";

@injectable()
export class SaveDepartmentUseCase implements ISaveDepartmentUseCase {
  //#region Propiedades
  private _departmentRepository: IDepartmentRepository;
  //#endregion

  //#region Constructor
  constructor(
    @inject(TYPES.IDepartmentRepository) departmentRepository: IDepartmentRepository
  ) {
    this._departmentRepository = departmentRepository;
  }
  //#endregion

  //#region Métodos públicos
  async execute(department: Department): Promise<void> {
    await this._departmentRepository.save(department);
  }
  //#endregion
}
