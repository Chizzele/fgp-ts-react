import React, { Component } from 'react'
import { MapPopupPropsInterface } from './DeviceWidgetMapInterfaces';
import './DeviceWidgetMap.css';

export class MapPopup extends Component<MapPopupPropsInterface> {
    constructor(props:MapPopupPropsInterface){
        super(props);

    }

    render() {
        return (
            <div className={this.props.popupVisible === false ? "d-none" : "MapPopUpCont"}>
                {
                    this.props.focusedFeatures.map((feature, index) => {
                        let properties:FocusFeatureProperties =  feature.properties;
                        return(
                            <div key={index} className={"MapPopUpFeature"}>
                                <span><b>Name: </b> {properties.name}</span>
                                <span><b>Description: </b> {properties.description}</span>
                                <span><b>Type: </b> {properties.type}</span>
                                <span><b>- - - - - - - -</b></span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default MapPopup
