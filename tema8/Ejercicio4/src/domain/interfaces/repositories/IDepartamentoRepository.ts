import { Departamento } from "../../entities/Departamento";

export interface IDepartamentoRepository {
  getAll(): Promise<Departamento[]>;
  getById(id: string): Promise<Departamento | null>;
  add(departamento: Departamento): Promise<void>;
  update(departamento: Departamento): Promise<void>;
  delete(id: string): Promise<void>;
}
