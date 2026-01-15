// Domain - DTO de Persona con nombre del departamento
export interface PersonaDTO {
    id: number;
    name: string;
    surname: string;
    telefono: string;
    direccion: string;
    foto: string;
    birth: string;
    departmentId: number;
    departmentName: string;
}
