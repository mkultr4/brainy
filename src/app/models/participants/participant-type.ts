export class ParticipantType {
    public id: any;
    public key: string;
    public name: string;
    public ico: string;
    

    constructor();
    constructor(
        id: string,
        key: string,
        name: string,
        ico: string
    );
    constructor(
        id?: string,
        key?: string,
        name?: string,
        ico?: string) { 
            this.id = id;
            this.key = key;
            this.name = name;
            this.ico = ico;
        }

}
