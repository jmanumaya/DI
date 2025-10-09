import { RepositoryPersona } from '../models/data/RepositoryPersona';

export class IndexVM{
    static getPersonas(){
        return RepositoryPersona.getAll()
    }
}