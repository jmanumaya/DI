// Persona Use Cases
export const TIPOS = {
  // Personas
  IGetPersonasUseCase: Symbol.for("IGetPersonasUseCase"),
  IAddPersonaUseCase: Symbol.for("IAddPersonaUseCase"),
  IUpdatePersonaUseCase: Symbol.for("IUpdatePersonaUseCase"),
  IDeletePersonaUseCase: Symbol.for("IDeletePersonaUseCase"),

  // Departamentos
  IGetDepartamentosUseCase: Symbol.for("IGetDepartamentosUseCase"),
  IAddDepartamentoUseCase: Symbol.for("IAddDepartamentoUseCase"),
  IUpdateDepartamentoUseCase: Symbol.for("IUpdateDepartamentoUseCase"),
  IDeleteDepartamentoUseCase: Symbol.for("IDeleteDepartamentoUseCase"),

  // Repositories
  IPersonaRepository: Symbol.for("IPersonaRepository"),
  IDepartamentoRepository: Symbol.for("IDepartamentoRepository"),

  // ViewModels
  PersonasViewModel: Symbol.for("PersonasViewModel"),
  DepartamentosViewModel: Symbol.for("DepartamentosViewModel"),
};
