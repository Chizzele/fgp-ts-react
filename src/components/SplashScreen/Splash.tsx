import React, { Component } from 'react'
import { SplashPropsInterface, SplashStateInterface } from './SplashInterfaces';
import { FavLinks } from '../SplashScreenWidgets/FavLinks/FavLinks';
import './Splash.css';

export class Splash extends Component<SplashPropsInterface, SplashStateInterface> {
    constructor(props:SplashPropsInterface){
        super(props);
        this.state = {
            isLoaded : false,
            favLinks : this.props.favLinks !== undefined ? this.props.favLinks : []
        }
    }

    

    render() {
        return (
            <div className={""}>
                <FavLinks 
                    favLinks={this.state.favLinks}
                />
            </div>
        )
    }
}

export default Splash
