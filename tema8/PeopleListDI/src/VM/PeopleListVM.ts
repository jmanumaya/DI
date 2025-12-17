import { Persona } from "../Domain/Entities/Persona";
import { inject, injectable } from "inversify"; // Faltaba injectable
import { TYPES } from "../Core/types";
import { IPersonasRepository } from "../Domain/Interfaces/IPersonasRepository";
import { makeAutoObservable, runInAction } from "mobx";

@injectable() // IMPORTANTE: No olvides el decorador aquí
export class PeopleListVM {

    private _personasList: Persona[] = [];
    private _personaSeleccionada: Persona | null = null; // Mejor null que undefined al inicio
    
    // CORRECCIÓN 1: Inicializar isLoading en true para que se vea el spinner al arrancar
    public isLoading: boolean = true; 

    constructor(
        @inject(TYPES.IRepositoryPersonas)
        private RepositoryPersonas: IPersonasRepository
    ) {
        // Inicializamos vacío o null
        // this._personaSeleccionada = new Persona(0, 'Fernando', 'Galiana'); // Opcional, mejor dejarlo null
        
        makeAutoObservable(this);
        
        // Llamamos a la carga
        this.loadPersonas();
    }

    private async loadPersonas(): Promise<void> {
        // Marcamos que está cargando (por si se llama desde fuera en el futuro)
        runInAction(() => {
            this.isLoading = true;
        });

        try {
            const data = await this.RepositoryPersonas.getListadoCompletoPersonas();
            
            // CORRECCIÓN 2: MobX requiere runInAction después de un await
            runInAction(() => {
                this._personasList = data;
                
                // Opcional: Seleccionar el primero por defecto si quieres
                if (data.length > 0) {
                     this._personaSeleccionada = data[0];
                }
            });
        } catch (error) {
            console.error("Error cargando VM:", error);
        } finally {
            // CORRECCIÓN 3: Apagar el loading siempre
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    public get personasList(): Persona[] {
        return this._personasList;
    }

    public get personaSeleccionada(): Persona | null {
        return this._personaSeleccionada;
    }

    public set personaSeleccionada(value: Persona) {
        this._personaSeleccionada = value;
    }
}