export interface IDeletePersonaUseCase {
  execute(id: string): Promise<void>;
}
