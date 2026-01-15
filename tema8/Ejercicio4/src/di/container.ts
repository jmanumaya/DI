import { Container } from "inversify";
import { TIPOS } from "./types";

// Repositories
import { DepartamentoRepositoryImpl } from "../data/repositories/DepartamentoRepositoryImpl";
import { PersonaRepositoryImpl } from "../data/repositories/PersonaRepositoryImpl";
import { IDepartamentoRepository } from "../domain/interfaces/repositories/IDepartamentoRepository";
import { IPersonaRepository } from "../domain/interfaces/repositories/IPersonaRepository";

// Use Cases - Personas
import { IAddPersonaUseCase } from "../domain/interfaces/usecases/personas/IAddPersonaUseCase";
import { IDeletePersonaUseCase } from "../domain/interfaces/usecases/personas/IDeletePersonaUseCase";
import { IGetPersonasUseCase } from "../domain/interfaces/usecases/personas/IGetPersonasUseCase";
import { IUpdatePersonaUseCase } from "../domain/interfaces/usecases/personas/IUpdatePersonaUseCase";
import { AddPersonaUseCase } from "../domain/usecases/personas/AddPersonaUseCase";
import { DeletePersonaUseCase } from "../domain/usecases/personas/DeletePersonaUseCase";
import { GetPersonasUseCase } from "../domain/usecases/personas/GetPersonasUseCase";
import { UpdatePersonaUseCase } from "../domain/usecases/personas/UpdatePersonaUseCase";

// Use Cases - Departamentos
import { IAddDepartamentoUseCase } from "../domain/interfaces/usecases/departamentos/IAddDepartamentoUseCase";
import { IDeleteDepartamentoUseCase } from "../domain/interfaces/usecases/departamentos/IDeleteDepartamentoUseCase";
import { IGetDepartamentosUseCase } from "../domain/interfaces/usecases/departamentos/IGetDepartamentosUseCase";
import { IUpdateDepartamentoUseCase } from "../domain/interfaces/usecases/departamentos/IUpdateDepartamentoUseCase";
import { AddDepartamentoUseCase } from "../domain/usecases/departamentos/AddDepartamentoUseCase";
import { DeleteDepartamentoUseCase } from "../domain/usecases/departamentos/DeleteDepartamentoUseCase";
import { GetDepartamentosUseCase } from "../domain/usecases/departamentos/GetDepartamentosUseCase";
import { UpdateDepartamentoUseCase } from "../domain/usecases/departamentos/UpdateDepartamentoUseCase";

// ViewModels
import { DepartamentosViewModel } from "../presentation/viewmodels/departamentos/DepartamentosViewModel";
import { PersonasViewModel } from "../presentation/viewmodels/personas/PersonasViewModel";

const container = new Container();

// Bind Repositories
container.bind<IPersonaRepository>(TIPOS.IPersonaRepository).to(PersonaRepositoryImpl);
container
  .bind<IDepartamentoRepository>(TIPOS.IDepartamentoRepository)
  .to(DepartamentoRepositoryImpl);

// Bind Use Cases - Personas
container.bind<IGetPersonasUseCase>(TIPOS.IGetPersonasUseCase).to(GetPersonasUseCase);
container.bind<IAddPersonaUseCase>(TIPOS.IAddPersonaUseCase).to(AddPersonaUseCase);
container.bind<IUpdatePersonaUseCase>(TIPOS.IUpdatePersonaUseCase).to(UpdatePersonaUseCase);
container
  .bind<IDeletePersonaUseCase>(TIPOS.IDeletePersonaUseCase)
  .to(DeletePersonaUseCase);

// Bind Use Cases - Departamentos
container
  .bind<IGetDepartamentosUseCase>(TIPOS.IGetDepartamentosUseCase)
  .to(GetDepartamentosUseCase);
container
  .bind<IAddDepartamentoUseCase>(TIPOS.IAddDepartamentoUseCase)
  .to(AddDepartamentoUseCase);
container
  .bind<IUpdateDepartamentoUseCase>(TIPOS.IUpdateDepartamentoUseCase)
  .to(UpdateDepartamentoUseCase);
container
  .bind<IDeleteDepartamentoUseCase>(TIPOS.IDeleteDepartamentoUseCase)
  .to(DeleteDepartamentoUseCase);

// Bind ViewModels (Singleton)
container
  .bind<PersonasViewModel>(TIPOS.PersonasViewModel)
  .toDynamicValue(() => {
    const getPersonasUseCase = container.get<IGetPersonasUseCase>(
      TIPOS.IGetPersonasUseCase
    );
    const addPersonaUseCase = container.get<IAddPersonaUseCase>(
      TIPOS.IAddPersonaUseCase
    );
    const updatePersonaUseCase = container.get<IUpdatePersonaUseCase>(
      TIPOS.IUpdatePersonaUseCase
    );
    const deletePersonaUseCase = container.get<IDeletePersonaUseCase>(
      TIPOS.IDeletePersonaUseCase
    );
    const getDepartamentosUseCase = container.get<IGetDepartamentosUseCase>(
      TIPOS.IGetDepartamentosUseCase
    );

    return PersonasViewModel.getInstance(
      getPersonasUseCase,
      addPersonaUseCase,
      updatePersonaUseCase,
      deletePersonaUseCase,
      getDepartamentosUseCase
    );
  })
  .inSingletonScope();

container
  .bind<DepartamentosViewModel>(TIPOS.DepartamentosViewModel)
  .toDynamicValue(() => {
    const getDepartamentosUseCase = container.get<IGetDepartamentosUseCase>(
      TIPOS.IGetDepartamentosUseCase
    );
    const addDepartamentoUseCase = container.get<IAddDepartamentoUseCase>(
      TIPOS.IAddDepartamentoUseCase
    );
    const updateDepartamentoUseCase = container.get<IUpdateDepartamentoUseCase>(
      TIPOS.IUpdateDepartamentoUseCase
    );
    const deleteDepartamentoUseCase = container.get<IDeleteDepartamentoUseCase>(
      TIPOS.IDeleteDepartamentoUseCase
    );

    return DepartamentosViewModel.getInstance(
      getDepartamentosUseCase,
      addDepartamentoUseCase,
      updateDepartamentoUseCase,
      deleteDepartamentoUseCase
    );
  })
  .inSingletonScope();

export { container };
