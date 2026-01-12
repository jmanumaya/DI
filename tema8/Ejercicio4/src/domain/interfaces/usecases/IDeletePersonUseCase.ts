export interface IDeletePersonUseCase {
execute(id: string): Promise<void>;
}