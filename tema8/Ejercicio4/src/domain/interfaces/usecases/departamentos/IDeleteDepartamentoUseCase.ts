export interface IDeleteDepartamentoUseCase {
  execute(id: string): Promise<void>;
}
