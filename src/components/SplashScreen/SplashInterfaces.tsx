export interface SplashPropsInterface {
    referenceName : string;
    referenceQuery : string;
    baseApiUrl : string;
    // searchingTypesOverride? : SearchingTypeArray
    widgets? : SplashWidgetArray
}

export interface SplashStateInterface {
    isLoaded : boolean;
    // searchingTypes : SearchingTypeArray;
}