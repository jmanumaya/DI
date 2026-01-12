export interface IDeleteDepartmentUseCase {
execute(id: string): Promise<void>;
}