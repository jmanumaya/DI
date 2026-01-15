import { Container } from "inversify";
import "reflect-metadata";
import { TYPES } from "./types";

// Repositories
import { DepartamentoRepositoryImpl } from "../data/repositories/DepartamentoRepositoryImpl";
import { PersonaRepositoryImpl } from "../data/repositories/PersonaRepositoryImpl";
import { IDepartamentoRepository } from "../domain/interfaces/repositories/IDepartamentoRepository";
import { IPersonaRepository } from "../domain/interfaces/repositories/IPersonaRepository";

// Use Cases - Personas
import { IAddPersonaUseCase } from "../domain/interfaces/useCases/personas/IAddPersonaUseCase";
import { IDeletePersonaUseCase } from "../domain/interfaces/useCases/personas/IDeletePersonaUseCase";
import { IGetPersonasUseCase } from "../domain/interfaces/useCases/personas/IGetPersonasUseCase";
import { IUpdatePersonaUseCase } from "../domain/interfaces/useCases/personas/IUpdatePersonaUseCase";
import { AddPersonaUseCase } from "../domain/useCases/personas/AddPersonaUseCase";
import { DeletePersonaUseCase } from "../domain/useCases/personas/DeletePersonaUseCase";
import { GetPersonasUseCase } from "../domain/useCases/personas/GetPersonasUseCase";
import { UpdatePersonaUseCase } from "../domain/useCases/personas/UpdatePersonaUseCase";

// Use Cases - Departamentos
import { IAddDepartamentoUseCase } from "../domain/interfaces/useCases/departamentos/IAddDepartamentoUseCase";
import { IDeleteDepartamentoUseCase } from "../domain/interfaces/useCases/departamentos/IDeleteDepartamentoUseCase";
import { IGetDepartamentosUseCase } from "../domain/interfaces/useCases/departamentos/IGetDepartamentosUseCase";
import { IUpdateDepartamentoUseCase } from "../domain/interfaces/useCases/departamentos/IUpdateDepartamentoUseCase";
import { AddDepartamentoUseCase } from "../domain/useCases/departamentos/AddDepartamentoUseCase";
import { DeleteDepartamentoUseCase } from "../domain/useCases/departamentos/DeleteDepartamentoUseCase";
import { GetDepartamentosUseCase } from "../domain/useCases/departamentos/GetDepartamentosUseCase";
import { UpdateDepartamentoUseCase } from "../domain/useCases/departamentos/UpdateDepartamentoUseCase";

// ViewModels
import { DepartamentosViewModel } from "../presentation/viewmodels/departamentos/DepartamentosViewModel";
import { PersonasViewModel } from "../presentation/viewmodels/personas/PersonasViewModel";

const container = new Container();

// Bind Repositories
container.bind<IPersonaRepository>(TYPES.IPersonaRepository).to(PersonaRepositoryImpl).inSingletonScope();
container.bind<IDepartamentoRepository>(TYPES.IDepartamentoRepository).to(DepartamentoRepositoryImpl).inSingletonScope();

// Bind Use Cases - Personas
container.bind<IGetPersonasUseCase>(TYPES.IGetPersonasUseCase).to(GetPersonasUseCase);
container.bind<IAddPersonaUseCase>(TYPES.IAddPersonaUseCase).to(AddPersonaUseCase);
container.bind<IUpdatePersonaUseCase>(TYPES.IUpdatePersonaUseCase).to(UpdatePersonaUseCase);
container.bind<IDeletePersonaUseCase>(TYPES.IDeletePersonaUseCase).to(DeletePersonaUseCase);

// Bind Use Cases - Departamentos
container.bind<IGetDepartamentosUseCase>(TYPES.IGetDepartamentosUseCase).to(GetDepartamentosUseCase);
container.bind<IAddDepartamentoUseCase>(TYPES.IAddDepartamentoUseCase).to(AddDepartamentoUseCase);
container.bind<IUpdateDepartamentoUseCase>(TYPES.IUpdateDepartamentoUseCase).to(UpdateDepartamentoUseCase);
container.bind<IDeleteDepartamentoUseCase>(TYPES.IDeleteDepartamentoUseCase).to(DeleteDepartamentoUseCase);

// Bind ViewModels (Singletons)
container.bind<PersonasViewModel>(TYPES.PersonasViewModel).to(PersonasViewModel).inSingletonScope();
container.bind<DepartamentosViewModel>(TYPES.DepartamentosViewModel).to(DepartamentosViewModel).inSingletonScope();

export { container };
