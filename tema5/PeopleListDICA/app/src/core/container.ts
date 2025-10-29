// app/src/core/container.ts
import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";

import { IPersonRepository } from "../domain/repositories/IPersonRepository";
import { PersonRepository } from "../data/repositories/PersonRepository";

import { IGetPersonListUseCase } from "../domain/usecases/IGetPersonListUseCase";
import { GetPersonListUseCase } from "../domain/usecases/GetPersonListUseCase";

import { PersonListViewModel } from "../presentation/viewmodels/PersonListViewModel";

const container = new Container();

// Bind repositorios
container.bind<IPersonRepository>(TYPES.IPersonRepository).to(PersonRepository);

// Bind casos de uso
container.bind<IGetPersonListUseCase>(TYPES.IGetPersonListUseCase).to(GetPersonListUseCase);

// Bind ViewModel
container.bind<PersonListViewModel>(TYPES.PersonListViewModel).to(PersonListViewModel);

export { container };
