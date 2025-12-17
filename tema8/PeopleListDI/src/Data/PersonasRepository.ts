import { injectable } from "inversify";
import { Persona } from "../Domain/Entities/Persona";
import { IPersonasRepository } from "../Domain/Interfaces/IPersonasRepository";

@injectable()
export class PersonasRepository implements IPersonasRepository {

    private readonly apiUrl = 'https://josemanuel-cxevfcgaewgadebz.spaincentral-01.azurewebsites.net/api/Personas';

    async getListadoCompletoPersonas(): Promise<Persona[]> {
        try {
            const response = await fetch(this.apiUrl);

            if (!response.ok) {
                throw new Error(`Error al conectar con la API: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();

            // --- CORRECCIÓN AQUÍ ---
            return data.map((item: any) => {
                const p = item.persona; 

                return new Persona(
                    p.id,           
                    p.name,      // Aquí estaba el fallo: es 'name', no 'nombre'
                    p.surname    // Aquí estaba el fallo: es 'surname', no 'apellidos'
                );
            });

        } catch (error) {
            console.error("Error en el repositorio de personas:", error);
            return [];
        }
    }
}