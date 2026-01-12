import { IPersonRepository } from "../interfaces/repositories/IPersonRepository";
import { IDeletePersonUseCase } from "../interfaces/usecases/IDeletePersonUseCase";


export class DeletePersonUseCase implements IDeletePersonUseCase {
constructor(private repo: IPersonRepository) {}


async execute(id: string) {
const day = new Date().getDay(); // 0 domingo
if (day === 0) {
throw new Error("Prohibido borrar en domingo");
}
await this.repo.delete(id);
}
}