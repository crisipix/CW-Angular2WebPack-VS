import { Injectable } from '@angular/core';


// Extra variables that live on Global that will be replaced by webpack DefinePlugin
declare var Environment: string;
declare var API_URL: string;

export interface GlobalEnvironment {
    Environment: string;
    API_URL: string;
}

@Injectable()
export class GlobalConfig implements GlobalEnvironment {
    Environment: string;
    API_URL: string;

    // put other configurations here as well. 
    constructor() {
        this.Environment = Environment;
        this.API_URL = API_URL;
    }
}
