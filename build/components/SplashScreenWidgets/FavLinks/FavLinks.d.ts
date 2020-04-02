import { Component } from 'react';
import { FavLinksPropsInterface, FavLinksStateInterface } from './FavLinksInterfaces';
export declare class FavLinks extends Component<FavLinksPropsInterface, FavLinksStateInterface> {
    constructor(props: FavLinksPropsInterface);
    retrieveFavLinks(favLinksToConcat?: FavLink[]): any;
    render(): JSX.Element;
}
export default FavLinks;
