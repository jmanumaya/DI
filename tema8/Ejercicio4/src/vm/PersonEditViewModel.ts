// src/vm/PersonEditViewModel.ts

import { makeObservable, observable, action, runInAction } from "mobx";
import { ISavePersonUseCase } from "../domain/interfaces/usecases/ISavePersonUseCase";
import { IGetDepartmentsUseCase } from "../domain/interfaces/usecases/IGetDepartmentsUseCase";
import { Person } from "../domain/entities/Person";
import { Department } from "../domain/entities/Department";

export class PersonEditViewModel {
  //#region Propiedades observables
  @observable name: string = "";
  @observable age: string = "";
  @observable photoUrl: string = "";
  @observable departmentId: string = "";
  @observable departments: Department[] = [];
  @observable errors: {
    name?: string;
    age?: string;
    departmentId?: string;
  } = {};
  @observable isLoading: boolean = false;
  //#endregion

  //#region Propiedades privadas
  private _savePersonUseCase: ISavePersonUseCase;
  private _getDepartmentsUseCase: IGetDepartmentsUseCase;
  private _personId?: string;
  //#endregion

  //#region Constructor
  constructor(
    savePersonUseCase: ISavePersonUseCase,
    getDepartmentsUseCase: IGetDepartmentsUseCase
  ) {
    this._savePersonUseCase = savePersonUseCase;
    this._getDepartmentsUseCase = getDepartmentsUseCase;

    makeObservable(this);
  }
  //#endregion

  //#region Métodos públicos
  @action
  initialize(person?: Person): void {
    if (person) {
      this._personId = person.id;
      this.name = person.name;
      this.age = person.age.toString();
      this.photoUrl = person.photoUrl || "";
      this.departmentId = person.departmentId;
    } else {
      this._personId = undefined;
      this.name = "";
      this.age = "";
      this.photoUrl = "";
      this.departmentId = "";
    }
    this.errors = {};
  }

  @action
  async loadDepartments(): Promise<void> {
    try {
      const departments = await this._getDepartmentsUseCase.execute();
      runInAction(() => {
        this.departments = departments;
      });
    } catch (err) {
      console.error("Error loading departments:", err);
    }
  }

  @action
  validate(): boolean {
    this.errors = {};

    if (this.name.trim() === "") {
      this.errors.name = "El nombre es obligatorio";
    }

    const ageNum = parseInt(this.age);
    if (isNaN(ageNum) || ageNum <= 0) {
      this.errors.age = "La edad debe ser un número válido mayor a 0";
    }

    if (this.departmentId.trim() === "") {
      this.errors.departmentId = "Debe seleccionar un departamento";
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
      const person = new Person(
        this.name,
        parseInt(this.age),
        this.departmentId,
        this.photoUrl || undefined,
        this._personId
      );

      await this._savePersonUseCase.execute(person);
      
      runInAction(() => {
        this.isLoading = false;
      });
      
      return true;
    } catch (err) {
      runInAction(() => {
        this.isLoading = false;
      });
      console.error("Error saving person:", err);
      return false;
    }
  }
  //#endregion
}
