import { makeObservable, observable, action, runInAction } from "mobx";
import { IGetDepartmentsUseCase } from "../domain/interfaces/usecases/IGetDepartmentsUseCase";
import { IDeleteDepartmentUseCase } from "../domain/interfaces/usecases/IDeleteDepartmentUseCase";
import { Department } from "../domain/entities/Department";

export class DepartmentListViewModel {
  //#region Propiedades observables
  @observable allDepartments: Department[] = [];
  @observable displayedDepartments: Department[] = [];
  @observable searchQuery: string = "";
  @observable isLoading: boolean = false;
  @observable error: string | null = null;
  //#endregion

  //#region Propiedades privadas
  private _getDepartmentsUseCase: IGetDepartmentsUseCase;
  private _deleteDepartmentUseCase: IDeleteDepartmentUseCase;
  //#endregion

  //#region Constructor
  constructor(
    getDepartmentsUseCase: IGetDepartmentsUseCase,
    deleteDepartmentUseCase: IDeleteDepartmentUseCase
  ) {
    this._getDepartmentsUseCase = getDepartmentsUseCase;
    this._deleteDepartmentUseCase = deleteDepartmentUseCase;

    makeObservable(this);
  }
  //#endregion

  //#region Métodos públicos
  @action
  async loadDepartments(): Promise<void> {
    this.isLoading = true;
    this.error = null;

    try {
      const departments = await this._getDepartmentsUseCase.execute();
      runInAction(() => {
        this.allDepartments = departments;
        this.displayedDepartments = departments;
        this.isLoading = false;
      });
    } catch (err) {
      runInAction(() => {
        this.error = err instanceof Error ? err.message : "Error al cargar departamentos";
        this.isLoading = false;
      });
    }
  }

  @action
  async deleteDepartment(id: string): Promise<void> {
    try {
      await this._deleteDepartmentUseCase.execute(id);
      await this.loadDepartments();
    } catch (err) {
      runInAction(() => {
        this.error = err instanceof Error ? err.message : "Error al eliminar departamento";
      });
      throw err;
    }
  }

  @action
  search(query: string): void {
    this.searchQuery = query;
    
    if (query.trim() === "") {
      this.displayedDepartments = this.allDepartments;
    } else {
      this.displayedDepartments = this.allDepartments.filter((department) =>
        department.name.toLowerCase().includes(query.toLowerCase())
      );
    }
  }
  //#endregion
}
