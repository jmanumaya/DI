import { injectable } from "inversify";
import { Persona } from "../Entities/Persona";


export interface IPersonasRepository {
     getListadoCompletoPersonas(): Persona[];
}
