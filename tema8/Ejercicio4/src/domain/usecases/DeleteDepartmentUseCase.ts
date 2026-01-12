import { IDepartmentRepository } from "../interfaces/repositories/IDepartmentRepository";
import { IDeleteDepartmentUseCase } from "../interfaces/usecases/IDeleteDepartmentUseCase";


export class DeleteDepartmentUseCase implements IDeleteDepartmentUseCase {
constructor(private repo: IDepartmentRepository) {}


async execute(id: string) {
await this.repo.delete(id);
}
}