import { injectable } from "inversify";
import { DepartamentoDTO } from "../../domain/dtos/DepartamentoDTO";
import { Departamento } from "../../domain/entities/Departamento";
import { IDepartamentoRepository } from "../../domain/interfaces/repositories/IDepartamentoRepository";
import { APIConnection } from "../datasources/api/APIConnection";

@injectable()
export class DepartamentoRepositoryImpl implements IDepartamentoRepository {
    async getAll(): Promise<DepartamentoDTO[]> {
        return await APIConnection.get<DepartamentoDTO[]>(
            APIConnection.DEPARTAMENTOS_URL
        );
    }

    async getById(id: number): Promise<DepartamentoDTO | null> {
        try {
            return await APIConnection.get<DepartamentoDTO>(
                `${APIConnection.DEPARTAMENTOS_URL}/${id}`
            );
        } catch {
            return null;
        }
    }

    async create(departamento: Omit<Departamento, "id">): Promise<Departamento> {
        return await APIConnection.post<Departamento>(
            APIConnection.DEPARTAMENTOS_URL,
            departamento
        );
    }

    async update(id: number, departamento: Partial<Departamento>): Promise<Departamento> {
        return await APIConnection.put<Departamento>(
            `${APIConnection.DEPARTAMENTOS_URL}/${id}`,
            { ...departamento, id }
        );
    }

    async delete(id: number): Promise<boolean> {
        return await APIConnection.delete(`${APIConnection.DEPARTAMENTOS_URL}/${id}`);
    }
}
