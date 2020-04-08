import React, { Component } from 'react'
import { FavLinksPropsInterface, FavLinksStateInterface } from './FavLinksInterfaces';

export class FavLinks extends Component<FavLinksPropsInterface, FavLinksStateInterface> {
    constructor(props:FavLinksPropsInterface){
        super(props);
        this.state = {
            favLinks : this.props.favLinks !== undefined ? this.retrieveFavLinks(this.props.favLinks) : this.retrieveFavLinks()
        }
    }


    retrieveFavLinks(favLinksToConcat?:FavLink[]){
        var item:any = localStorage.getItem('fgp_ts_ui_f')
        // have no local storage, create it
        var finalLinks:FavLink[] = [];
        favLinksToConcat !== undefined && favLinksToConcat.length > 0 ? finalLinks = favLinksToConcat : finalLinks = []
        if(item === null){
            localStorage.setItem("fgp_ts_ui_f", JSON.stringify({favLinks : finalLinks}))
            return finalLinks;
        }else{
            let x = JSON.parse(item)
            return x.favLinks.concat(finalLinks);
        }
    }

    render() {
        return (
            <ul>
            {
                this.state.favLinks.map((link, index) => {
                    return(
                        <li key={index}>
                            <a href={link.url}>{link.name}</a>
                        </li>
                    )
                })
            }
            </ul>
        )
    }
}

export default FavLinks
