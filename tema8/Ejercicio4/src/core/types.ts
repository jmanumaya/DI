export const TYPES = {
  // Repositories
  IPersonRepository: Symbol.for("IPersonRepository"),
  IDepartmentRepository: Symbol.for("IDepartmentRepository"),
  
  // Use Cases - Person
  IGetPeopleUseCase: Symbol.for("IGetPeopleUseCase"),
  IDeletePersonUseCase: Symbol.for("IDeletePersonUseCase"),
  ISavePersonUseCase: Symbol.for("ISavePersonUseCase"),
  
  // Use Cases - Department
  IGetDepartmentsUseCase: Symbol.for("IGetDepartmentsUseCase"),
  IDeleteDepartmentUseCase: Symbol.for("IDeleteDepartmentUseCase"),
  ISaveDepartmentUseCase: Symbol.for("ISaveDepartmentUseCase"),
};