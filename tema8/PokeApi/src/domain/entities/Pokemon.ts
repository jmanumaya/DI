export class Pokemon {
    //#region Propiedades privadas
    private _id: string;
    private _name: string;
    private _url: string;
    //#endregion Propiedades privadas

    constructor(id: string, name: string, url: string){
        this._id = id;
        this._name = name;
        this._url = url
    }

    get id(): string{
        return this._id
    }
    get name(): string{
        return this._name
    }
    get url(): string{
        return this._url
    }

    set name(value: string) {
        if (!value.trim()) throw new Error("El nombre no puede estar vacío");
        this._name = value;
    }
    set url(value: string) {
        if (!value.trim()) throw new Error("La url no puede estar vacía");
        this._url = value;
    }
}
