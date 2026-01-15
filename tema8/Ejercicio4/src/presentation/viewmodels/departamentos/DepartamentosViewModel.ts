import { action, makeObservable, observable, runInAction } from "mobx";
import { Departamento } from "../../../domain/entities/Departamento";
import { IAddDepartamentoUseCase } from "../../../domain/interfaces/usecases/departamentos/IAddDepartamentoUseCase";
import { IDeleteDepartamentoUseCase } from "../../../domain/interfaces/usecases/departamentos/IDeleteDepartamentoUseCase";
import { IGetDepartamentosUseCase } from "../../../domain/interfaces/usecases/departamentos/IGetDepartamentosUseCase";
import { IUpdateDepartamentoUseCase } from "../../../domain/interfaces/usecases/departamentos/IUpdateDepartamentoUseCase";
import { DepartamentoUIModel } from "../../models/DepartamentoUIModel";

export class DepartamentosViewModel {
  private static instance: DepartamentosViewModel;

  @observable departamentos: DepartamentoUIModel[] = [];
  @observable departamentosFiltered: DepartamentoUIModel[] = [];
  @observable departamentoSeleccionado: DepartamentoUIModel | null = null;
  @observable isLoading: boolean = false;
  @observable error: string | null = null;
  @observable searchQuery: string = "";

  private getDepartamentosUseCase: IGetDepartamentosUseCase;
  private addDepartamentoUseCase: IAddDepartamentoUseCase;
  private updateDepartamentoUseCase: IUpdateDepartamentoUseCase;
  private deleteDepartamentoUseCase: IDeleteDepartamentoUseCase;

  private constructor(
    getDepartamentosUseCase: IGetDepartamentosUseCase,
    addDepartamentoUseCase: IAddDepartamentoUseCase,
    updateDepartamentoUseCase: IUpdateDepartamentoUseCase,
    deleteDepartamentoUseCase: IDeleteDepartamentoUseCase
  ) {
    this.getDepartamentosUseCase = getDepartamentosUseCase;
    this.addDepartamentoUseCase = addDepartamentoUseCase;
    this.updateDepartamentoUseCase = updateDepartamentoUseCase;
    this.deleteDepartamentoUseCase = deleteDepartamentoUseCase;

    makeObservable(this);
  }

  static getInstance(
    getDepartamentosUseCase: IGetDepartamentosUseCase,
    addDepartamentoUseCase: IAddDepartamentoUseCase,
    updateDepartamentoUseCase: IUpdateDepartamentoUseCase,
    deleteDepartamentoUseCase: IDeleteDepartamentoUseCase
  ): DepartamentosViewModel {
    if (!DepartamentosViewModel.instance) {
      DepartamentosViewModel.instance = new DepartamentosViewModel(
        getDepartamentosUseCase,
        addDepartamentoUseCase,
        updateDepartamentoUseCase,
        deleteDepartamentoUseCase
      );
    }
    return DepartamentosViewModel.instance;
  }

  @action
  async cargarDepartamentos(): Promise<void> {
    this.isLoading = true;
    this.error = null;

    try {
      const departamentos = await this.getDepartamentosUseCase.execute();
      runInAction(() => {
        this.departamentos = departamentos.map(
          (d) => new DepartamentoUIModel(d.nombre, d.id)
        );
        this.departamentosFiltered = this.departamentos;
        this.isLoading = false;
      });
    } catch (err) {
      runInAction(() => {
        this.error = err instanceof Error ? err.message : "Error al cargar";
        this.isLoading = false;
      });
    }
  }

  @action
  async agregarDepartamento(departamento: DepartamentoUIModel): Promise<void> {
    try {
      const departamentoDomain = new Departamento(departamento.nombre);
      await this.addDepartamentoUseCase.execute(departamentoDomain);
      await this.cargarDepartamentos();
    } catch (err) {
      runInAction(() => {
        this.error = err instanceof Error ? err.message : "Error al añadir";
      });
      throw err;
    }
  }

  @action
  async actualizarDepartamento(
    departamento: DepartamentoUIModel
  ): Promise<void> {
    try {
      const departamentoDomain = new Departamento(
        departamento.nombre,
        departamento.id
      );
      await this.updateDepartamentoUseCase.execute(departamentoDomain);
      await this.cargarDepartamentos();
    } catch (err) {
      runInAction(() => {
        this.error = err instanceof Error ? err.message : "Error al actualizar";
      });
      throw err;
    }
  }

  @action
  async eliminarDepartamento(id: string): Promise<void> {
    try {
      await this.deleteDepartamentoUseCase.execute(id);
      await this.cargarDepartamentos();
    } catch (err) {
      runInAction(() => {
        this.error = err instanceof Error ? err.message : "Error al eliminar";
      });
      throw err;
    }
  }

  @action
  seleccionarDepartamento(departamento: DepartamentoUIModel): void {
    this.departamentoSeleccionado = departamento;
  }

  @action
  limpiarSeleccion(): void {
    this.departamentoSeleccionado = null;
  }

  @action
  buscar(query: string): void {
    this.searchQuery = query;
    if (query.trim() === "") {
      this.departamentosFiltered = this.departamentos;
    } else {
      this.departamentosFiltered = this.departamentos.filter((d) =>
        d.nombre.toLowerCase().includes(query.toLowerCase())
      );
    }
  }
}
