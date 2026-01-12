// src/domain/usecases/GetDepartmentsUseCase.ts

import { injectable, inject } from "inversify";
import { IGetDepartmentsUseCase } from "../interfaces/usecases/IGetDepartmentsUseCase";
import { IDepartmentRepository } from "../interfaces/repositories/IDepartmentRepository";
import { Department } from "../entities/Department";
import { TYPES } from "../../core/types";

@injectable()
export class GetDepartmentsUseCase implements IGetDepartmentsUseCase {
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
  async execute(): Promise<Department[]> {
    return await this._departmentRepository.getAll();
  }
  //#endregion
}
