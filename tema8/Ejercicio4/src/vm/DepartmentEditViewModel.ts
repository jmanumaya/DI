import { makeObservable, observable, action, runInAction } from "mobx";
import { ISaveDepartmentUseCase } from "../domain/interfaces/usecases/ISaveDepartmentUseCase";
import { Department } from "../domain/entities/Department";

export class DepartmentEditViewModel {
  //#region Propiedades observables
  @observable name: string = "";
  @observable errors: {
    name?: string;
  } = {};
  @observable isLoading: boolean = false;
  //#endregion

  //#region Propiedades privadas
  private _saveDepartmentUseCase: ISaveDepartmentUseCase;
  private _departmentId?: string;
  //#endregion

  //#region Constructor
  constructor(saveDepartmentUseCase: ISaveDepartmentUseCase) {
    this._saveDepartmentUseCase = saveDepartmentUseCase;

    makeObservable(this);
  }
  //#endregion

  //#region Métodos públicos
  @action
  initialize(department?: Department): void {
    if (department) {
      this._departmentId = department.id;
      this.name = department.name;
    } else {
      this._departmentId = undefined;
      this.name = "";
    }
    this.errors = {};
  }

  @action
  validate(): boolean {
    this.errors = {};

    if (this.name.trim() === "") {
      this.errors.name = "El nombre es obligatorio";
    }

    return Object.keys(this.errors).length === 0;
  }

  @action
  async save(): Promise<boolean> {
    if (!this.validate()) {
      return false;
    }

    this.isLoading = true;

    try {
      const department = new Department(this.name, this._departmentId);

      await this._saveDepartmentUseCase.execute(department);
      
      runInAction(() => {
        this.isLoading = false;
      });
      
      return true;
    } catch (err) {
      runInAction(() => {
        this.isLoading = false;
      });
      console.error("Error saving department:", err);
      return false;
    }
  }
  //#endregion
}
