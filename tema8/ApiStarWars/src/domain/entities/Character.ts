export class Character {
    constructor(
        public id: string,
        public name: string
    ) {}
}

export class CharacterDetail {
    constructor(
        public name: string,
        public gender: string,
        public homeworldName: string
    ) {}
}