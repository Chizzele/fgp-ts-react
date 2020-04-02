export interface SplashPropsInterface {
    referenceName: string;
    referenceQuery: string;
    baseApiUrl: string;
    widgets?: SplashWidgetArray;
    favLinks?: FavLink[];
}
export interface SplashStateInterface {
    isLoaded: boolean;
    favLinks: FavLink[];
}
