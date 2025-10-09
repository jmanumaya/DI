export class Persona {
    private _id: number;
    private _nombre: string;
    private _apellido: string;

    constructor(id: number, nombre: string, apellido: string) {
        this._id = id;
        this._nombre = nombre;
        this._apellido = apellido;
    }

    public get id(): number {
        return this._id;
    }

    public get nombre(): string {
        return this._nombre;
    }

    public get apellido(): string {
        return this._apellido;
    }

    public get nombreCompleto(): string {
        return `${this._nombre} ${this._apellido}`;
    }
}