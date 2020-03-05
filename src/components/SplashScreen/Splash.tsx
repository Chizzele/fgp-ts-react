import React, { Component } from 'react'
import { SplashPropsInterface, SplashStateInterface } from './SplashInterfaces';
import './Splash.css';

export class Splash extends Component<SplashPropsInterface, SplashStateInterface> {
    constructor(props:SplashPropsInterface){
        super(props);
        this.state = {
            isLoaded : false,
        }
    }
    render() {
        return (
            <div className={"navigationAwareContainer of-hidden splashDefault"}>
                {/* <div className={"splashHeading"}>
                    
                </div> */}
                {/* {
                    this.props.widgets ? (
                        this.props.widgets.map( widget => {
                            return(widget)
                        })
                    ) : (null)
                } */}
            </div>
        )
    }
}

export default Splash
