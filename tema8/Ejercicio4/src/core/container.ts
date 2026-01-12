// src/core/container/di.ts

import { Container } from "inversify";
import { TYPES } from "./types";

// Repositories
import { IPersonRepository } from "../domain/interfaces/repositories/IPersonRepository";
import { IDepartmentRepository } from "../domain/interfaces/repositories/IDepartmentRepository";
import { PersonRepository } from "../data/repositories/PersonRepository";
import { DepartmentRepository } from "../data/repositories/DepartmentRepository";

// Use Cases - Person
import { IGetPeopleUseCase } from "../domain/interfaces/usecases/IGetPeopleUseCase";
import { IDeletePersonUseCase } from "../domain/interfaces/usecases/IDeletePersonUseCase";
import { ISavePersonUseCase } from "../domain/interfaces/usecases/ISavePersonUseCase";
import { GetPeopleUseCase } from "../domain/usecases/GetPeopleUseCase";
import { DeletePersonUseCase } from "../domain/usecases/DeletePersonUseCase";
import { SavePersonUseCase } from "../domain/usecases/SavePersonUseCase";

// Use Cases - Department
import { IGetDepartmentsUseCase } from "../domain/interfaces/usecases/IGetDepartmentsUseCase";
import { IDeleteDepartmentUseCase } from "../domain/interfaces/usecases/IDeleteDepartmentUseCase";
import { ISaveDepartmentUseCase } from "../domain/interfaces/usecases/ISaveDepartmentUseCase";
import { GetDepartmentsUseCase } from "../domain/usecases/GetDepartmentsUseCase";
import { DeleteDepartmentUseCase } from "../domain/usecases/DeleteDepartmentUseCase";
import { SaveDepartmentUseCase } from "../domain/usecases/SaveDepartmentUseCase";

const container = new Container();

// Bind Repositories
container.bind<IPersonRepository>(TYPES.IPersonRepository).to(PersonRepository);
container.bind<IDepartmentRepository>(TYPES.IDepartmentRepository).to(DepartmentRepository);

// Bind Use Cases - Person
container.bind<IGetPeopleUseCase>(TYPES.IGetPeopleUseCase).to(GetPeopleUseCase);
container.bind<IDeletePersonUseCase>(TYPES.IDeletePersonUseCase).to(DeletePersonUseCase);
container.bind<ISavePersonUseCase>(TYPES.ISavePersonUseCase).to(SavePersonUseCase);

// Bind Use Cases - Department
container.bind<IGetDepartmentsUseCase>(TYPES.IGetDepartmentsUseCase).to(GetDepartmentsUseCase);
container.bind<IDeleteDepartmentUseCase>(TYPES.IDeleteDepartmentUseCase).to(DeleteDepartmentUseCase);
container.bind<ISaveDepartmentUseCase>(TYPES.ISaveDepartmentUseCase).to(SaveDepartmentUseCase);

export { container };
