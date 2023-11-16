import { Locality } from '../location/locality';
import { City } from '../location/city';
import { Estate } from '../location/state';
import { Country } from '../location/country';
import { StateAst } from '@angular/animations/browser/src/dsl/animation_ast';

export class BillingInformation {
    id: any;
    businessName: string;
    taxIdentification: string;
    addressStreet: string;
    addressNumber: string;
    addressInsideNumber: string;
    country: Country;
    city: City;
    state: StateAst;
    locality: Locality;
    zip: string;
    email: string;
    email2: string;
}
