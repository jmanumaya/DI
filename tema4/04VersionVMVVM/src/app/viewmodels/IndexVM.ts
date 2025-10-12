import { RepositoryPersona } from '../models/data/RepositoryPersona';

export class IndexVM {
    static getPersonas() {
        return RepositoryPersona.getAll();
    }

    static getPersonaById(id: number) {
        const personas = RepositoryPersona.getAll();
        return personas.find(p => p.id === id);
    }
}
