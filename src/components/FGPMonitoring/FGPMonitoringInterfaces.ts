export interface MonitorAPIPropsInterface {
    refreshRate? : number;
    apiGetUrl : string;
    baseUrl : string;
    pulse? : boolean
}

export interface MonitorAPIStateInterface {
    refreshRate : number;
    isUp : string;
}

