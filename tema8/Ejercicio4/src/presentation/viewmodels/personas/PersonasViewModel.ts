import { action, makeObservable, observable, runInAction } from "mobx";
import { Persona } from "../../../domain/entities/Persona";
import { IGetDepartamentosUseCase } from "../../../domain/interfaces/usecases/departamentos/IGetDepartamentosUseCase";
import { IAddPersonaUseCase } from "../../../domain/interfaces/usecases/personas/IAddPersonaUseCase";
import { IDeletePersonaUseCase } from "../../../domain/interfaces/usecases/personas/IDeletePersonaUseCase";
import { IGetPersonasUseCase } from "../../../domain/interfaces/usecases/personas/IGetPersonasUseCase";
import { IUpdatePersonaUseCase } from "../../../domain/interfaces/usecases/personas/IUpdatePersonaUseCase";
import { PersonaUIModel } from "../../models/PersonaUIModel";

export class PersonasViewModel {
  private static instance: PersonasViewModel;

  @observable personas: PersonaUIModel[] = [];
  @observable personasFiltered: PersonaUIModel[] = [];
  @observable personaSeleccionada: PersonaUIModel | null = null;
  @observable isLoading: boolean = false;
  @observable error: string | null = null;
  @observable searchQuery: string = "";

  private getPersonasUseCase: IGetPersonasUseCase;
  private addPersonaUseCase: IAddPersonaUseCase;
  private updatePersonaUseCase: IUpdatePersonaUseCase;
  private deletePersonaUseCase: IDeletePersonaUseCase;
  private getDepartamentosUseCase: IGetDepartamentosUseCase;

  private constructor(
    getPersonasUseCase: IGetPersonasUseCase,
    addPersonaUseCase: IAddPersonaUseCase,
    updatePersonaUseCase: IUpdatePersonaUseCase,
    deletePersonaUseCase: IDeletePersonaUseCase,
    getDepartamentosUseCase: IGetDepartamentosUseCase
  ) {
    this.getPersonasUseCase = getPersonasUseCase;
    this.addPersonaUseCase = addPersonaUseCase;
    this.updatePersonaUseCase = updatePersonaUseCase;
    this.deletePersonaUseCase = deletePersonaUseCase;
    this.getDepartamentosUseCase = getDepartamentosUseCase;

    makeObservable(this);
  }

  static getInstance(
    getPersonasUseCase: IGetPersonasUseCase,
    addPersonaUseCase: IAddPersonaUseCase,
    updatePersonaUseCase: IUpdatePersonaUseCase,
    deletePersonaUseCase: IDeletePersonaUseCase,
    getDepartamentosUseCase: IGetDepartamentosUseCase
  ): PersonasViewModel {
    if (!PersonasViewModel.instance) {
      PersonasViewModel.instance = new PersonasViewModel(
        getPersonasUseCase,
        addPersonaUseCase,
        updatePersonaUseCase,
        deletePersonaUseCase,
        getDepartamentosUseCase
      );
    }
    return PersonasViewModel.instance;
  }

  @action
  async cargarPersonas(): Promise<void> {
    this.isLoading = true;
    this.error = null;

    try {
      const personas = await this.getPersonasUseCase.execute();
      const departamentos = await this.getDepartamentosUseCase.execute();

      runInAction(() => {
        this.personas = personas.map(
          (p) =>
            new PersonaUIModel(
              p.nombre,
              p.edad,
              p.departamentoId,
              p.foto,
              p.id,
              departamentos.find((d) => d.id === p.departamentoId)?.nombre
            )
        );
        this.personasFiltered = this.personas;
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
  async agregarPersona(persona: PersonaUIModel): Promise<void> {
    try {
      const personaDomain = new Persona(
        persona.nombre,
        persona.edad,
        persona.departamentoId,
        persona.foto
      );
      await this.addPersonaUseCase.execute(personaDomain);
      await this.cargarPersonas();
    } catch (err) {
      runInAction(() => {
        this.error = err instanceof Error ? err.message : "Error al añadir";
      });
      throw err;
    }
  }

  @action
  async actualizarPersona(persona: PersonaUIModel): Promise<void> {
    try {
      const personaDomain = new Persona(
        persona.nombre,
        persona.edad,
        persona.departamentoId,
        persona.foto,
        persona.id
      );
      await this.updatePersonaUseCase.execute(personaDomain);
      await this.cargarPersonas();
    } catch (err) {
      runInAction(() => {
        this.error = err instanceof Error ? err.message : "Error al actualizar";
      });
      throw err;
    }
  }

  @action
  async eliminarPersona(id: string): Promise<void> {
    try {
      await this.deletePersonaUseCase.execute(id);
      await this.cargarPersonas();
    } catch (err) {
      runInAction(() => {
        this.error = err instanceof Error ? err.message : "Error al eliminar";
      });
      throw err;
    }
  }

  @action
  seleccionarPersona(persona: PersonaUIModel): void {
    this.personaSeleccionada = persona;
  }

  @action
  limpiarSeleccion(): void {
    this.personaSeleccionada = null;
  }

  @action
  buscar(query: string): void {
    this.searchQuery = query;
    if (query.trim() === "") {
      this.personasFiltered = this.personas;
    } else {
      this.personasFiltered = this.personas.filter((p) =>
        p.nombre.toLowerCase().includes(query.toLowerCase())
      );
    }
  }
}
