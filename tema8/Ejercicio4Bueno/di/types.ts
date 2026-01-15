// Tipos para la inyección de dependencias con Inversify
export const TYPES = {
    // Repositories
    IPersonaRepository: Symbol.for("IPersonaRepository"),
    IDepartamentoRepository: Symbol.for("IDepartamentoRepository"),

    // Use Cases - Personas
    IGetPersonasUseCase: Symbol.for("IGetPersonasUseCase"),
    IAddPersonaUseCase: Symbol.for("IAddPersonaUseCase"),
    IUpdatePersonaUseCase: Symbol.for("IUpdatePersonaUseCase"),
    IDeletePersonaUseCase: Symbol.for("IDeletePersonaUseCase"),

    // Use Cases - Departamentos
    IGetDepartamentosUseCase: Symbol.for("IGetDepartamentosUseCase"),
    IAddDepartamentoUseCase: Symbol.for("IAddDepartamentoUseCase"),
    IUpdateDepartamentoUseCase: Symbol.for("IUpdateDepartamentoUseCase"),
    IDeleteDepartamentoUseCase: Symbol.for("IDeleteDepartamentoUseCase"),

    // ViewModels
    PersonasViewModel: Symbol.for("PersonasViewModel"),
    DepartamentosViewModel: Symbol.for("DepartamentosViewModel"),
};
