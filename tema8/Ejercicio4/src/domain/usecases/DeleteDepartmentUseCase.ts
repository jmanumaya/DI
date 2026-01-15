import { inject, injectable } from "inversify";
import { TYPES } from "../../core/types";
import { IDepartmentRepository } from "../interfaces/repositories/IDepartmentRepository";
import { IDeleteDepartmentUseCase } from "../interfaces/usecases/IDeleteDepartmentUseCase";

@injectable()
export class DeleteDepartmentUseCase implements IDeleteDepartmentUseCase {
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
  async execute(id: string): Promise<void> {
    await this._departmentRepository.delete(id);
  }
  //#endregion
}