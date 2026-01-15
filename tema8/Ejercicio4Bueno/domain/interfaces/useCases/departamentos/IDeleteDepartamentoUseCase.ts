export interface IDeleteDepartamentoUseCase {
    execute(id: number): Promise<boolean>;
}
