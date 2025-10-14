import { RepositoryPersona } from '../models/data/RepositoryPersona';
import { Persona } from '../models/entities/PersonaModel';

export class IndexVM {

    private _personas: Persona[];
    private _personaSeleccionada: Persona | null = null;

    constructor(){
        this._personas = RepositoryPersona.getAll();
    }

    public set PersonaSeleccionada(item: Persona){
        this._personaSeleccionada = item;
        this.alertPersonaSeleccionada()
    }

    private alertPersonaSeleccionada(){
        alert(`La persona seleccionada es: ${this._personaSeleccionada?.nombre}`)
    }

    public get Personas() {
        return this._personas;
    }
}
