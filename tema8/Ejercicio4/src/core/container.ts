import { Container } from "inversify";
import { TYPES } from "./types";

// Repositories
import { DepartmentRepository } from "../data/repositories/DepartmentRepository";
import { PersonRepository } from "../data/repositories/PersonRepository";
import { IDepartmentRepository } from "../domain/interfaces/repositories/IDepartmentRepository";
import { IPersonRepository } from "../domain/interfaces/repositories/IPersonRepository";

// Use Cases - Person
import { IDeletePersonUseCase } from "../domain/interfaces/usecases/IDeletePersonUseCase";
import { IGetPeopleUseCase } from "../domain/interfaces/usecases/IGetPeopleUseCase";
import { ISavePersonUseCase } from "../domain/interfaces/usecases/ISavePersonUseCase";
import { DeletePersonUseCase } from "../domain/usecases/DeletePersonUseCase";
import { GetPeopleUseCase } from "../domain/usecases/GetPeopleUseCase";
import { SavePersonUseCase } from "../domain/usecases/SavePersonUseCase";

// Use Cases - Department
import { IDeleteDepartmentUseCase } from "../domain/interfaces/usecases/IDeleteDepartmentUseCase";
import { IGetDepartmentsUseCase } from "../domain/interfaces/usecases/IGetDepartmentsUseCase";
import { ISaveDepartmentUseCase } from "../domain/interfaces/usecases/ISaveDepartmentUseCase";
import { DeleteDepartmentUseCase } from "../domain/usecases/DeleteDepartmentUseCase";
import { GetDepartmentsUseCase } from "../domain/usecases/GetDepartmentsUseCase";
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
