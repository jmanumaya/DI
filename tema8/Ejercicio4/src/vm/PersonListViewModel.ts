// src/vm/PersonListViewModel.ts

import { makeObservable, observable, action, runInAction } from "mobx";
import { IGetPeopleUseCase } from "../domain/interfaces/usecases/IGetPeopleUseCase";
import { IDeletePersonUseCase } from "../domain/interfaces/usecases/IDeletePersonUseCase";
import { Person } from "../domain/entities/Person";

export class PersonListViewModel {
  //#region Propiedades observables
  @observable allPersons: Person[] = [];
  @observable displayedPersons: Person[] = [];
  @observable searchQuery: string = "";
  @observable isLoading: boolean = false;
  @observable error: string | null = null;
  //#endregion

  //#region Propiedades privadas
  private _getPeopleUseCase: IGetPeopleUseCase;
  private _deletePersonUseCase: IDeletePersonUseCase;
  //#endregion

  //#region Constructor
  constructor(
    getPersonsUseCase: IGetPeopleUseCase,
    deletePersonUseCase: IDeletePersonUseCase
  ) {
    this._getPeopleUseCase = getPersonsUseCase;
    this._deletePersonUseCase = deletePersonUseCase;

    makeObservable(this);
  }
  //#endregion

  //#region Métodos públicos
  @action
  async loadPersons(): Promise<void> {
    this.isLoading = true;
    this.error = null;

    try {
      const persons = await this._getPeopleUseCase.execute();
      runInAction(() => {
        this.allPersons = persons;
        this.displayedPersons = persons;
        this.isLoading = false;
      });
    } catch (err) {
      runInAction(() => {
        this.error = err instanceof Error ? err.message : "Error al cargar personas";
        this.isLoading = false;
      });
    }
  }

  @action
  async deletePerson(id: string): Promise<void> {
    try {
      await this._deletePersonUseCase.execute(id);
      await this.loadPersons();
    } catch (err) {
      runInAction(() => {
        this.error = err instanceof Error ? err.message : "Error al eliminar persona";
      });
      throw err;
    }
  }

  @action
  search(query: string): void {
    this.searchQuery = query;
    
    if (query.trim() === "") {
      this.displayedPersons = this.allPersons;
    } else {
      this.displayedPersons = this.allPersons.filter((person) =>
        person.name.toLowerCase().includes(query.toLowerCase())
      );
    }
  }
  //#endregion
}
