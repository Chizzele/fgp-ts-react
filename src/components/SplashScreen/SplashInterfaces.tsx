export interface SplashPropsInterface {
    referenceName : string;
    referenceQuery : string;
    baseApiUrl : string;
    // searchingTypesOverride? : SearchingTypeArray
    widgets? : SplashWidgetArray
    favLinks? : FavLink[];
}

export interface SplashStateInterface {
    isLoaded : boolean;
    favLinks : FavLink[];
    // searchingTypes : SearchingTypeArray;
}