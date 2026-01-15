import { DepartamentoDTO } from "../../dtos/DepartamentoDTO";
import { Departamento } from "../../entities/Departamento";

// Interfaz del repositorio de Departamentos
export interface IDepartamentoRepository {
    getAll(): Promise<DepartamentoDTO[]>;
    getById(id: number): Promise<DepartamentoDTO | null>;
    create(departamento: Omit<Departamento, "id">): Promise<Departamento>;
    update(id: number, departamento: Partial<Departamento>): Promise<Departamento>;
    delete(id: number): Promise<boolean>;
}
