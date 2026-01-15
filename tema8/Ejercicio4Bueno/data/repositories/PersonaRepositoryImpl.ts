import { injectable } from "inversify";
import { PersonaDTO } from "../../domain/dtos/PersonaDTO";
import { Persona } from "../../domain/entities/Persona";
import { IPersonaRepository } from "../../domain/interfaces/repositories/IPersonaRepository";
import { APIConnection } from "../datasources/api/APIConnection";

interface PersonaAPIResponse {
    persona: Persona;
    departmentName: string;
}

@injectable()
export class PersonaRepositoryImpl implements IPersonaRepository {
    async getAll(): Promise<PersonaDTO[]> {
        const response = await APIConnection.get<PersonaAPIResponse[]>(
            APIConnection.PERSONAS_URL
        );
        return response.map(item => ({
            ...item.persona,
            departmentName: item.departmentName,
        }));
    }

    async getById(id: number): Promise<PersonaDTO | null> {
        try {
            const response = await APIConnection.get<PersonaAPIResponse>(
                `${APIConnection.PERSONAS_URL}/${id}`
            );
            return {
                ...response.persona,
                departmentName: response.departmentName,
            };
        } catch {
            return null;
        }
    }

    async create(persona: Omit<Persona, "id">): Promise<Persona> {
        return await APIConnection.post<Persona>(
            APIConnection.PERSONAS_URL,
            persona
        );
    }

    async update(id: number, persona: Partial<Persona>): Promise<Persona> {
        return await APIConnection.put<Persona>(
            `${APIConnection.PERSONAS_URL}/${id}`,
            { ...persona, id }
        );
    }

    async delete(id: number): Promise<boolean> {
        return await APIConnection.delete(`${APIConnection.PERSONAS_URL}/${id}`);
    }
}
