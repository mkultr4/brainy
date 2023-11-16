export class Plan {
    public id: any;
    public key: string;
    public name: string;
    public description: string;
    public status: string;
    public order:number;
    // Price
    public priceMonthly: number;
    public priceAnnual: number;

    // Information
    public users: number;
    public projects: number;
    public guests: number;
    public storage: number;

}
