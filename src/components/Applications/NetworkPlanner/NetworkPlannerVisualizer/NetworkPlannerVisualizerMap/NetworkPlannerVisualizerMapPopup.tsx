import React, { Component } from 'react'
import { VisualizerMapPopupPropsInterface } from './NetworkPlannerVisualizerMapInterfaces';
import '../../../../Maps/DeviceWidgetMap/DeviceWidgetMap.css';

export class VisualizerMapPopup extends Component<VisualizerMapPopupPropsInterface> {
    constructor(props:VisualizerMapPopupPropsInterface){
        super(props);

    }

    render() {
        return (
            <div className={this.props.popupVisible === false ? "d-none" : "MapPopUpCont"}>
                {
                    this.props.focusedFeatures.map((feature:any, index) => {
                        let _properties:any =  feature.properties;
                        if(_properties.isParent === true){
                            let propertiesP:NetworkPlannerVisualizerParentFeature = feature.properties
                            return(
                                <div key={index} className={"MapPopUpFeature"}>
                                    <span><b>Name: </b> {propertiesP.name}</span>
                                    <span><b>Type: </b> {propertiesP.deviceType}</span>
                                    <span><b>- - - - - - - -</b></span>
                                </div>
                            )
                        }else{
                            let propertiesC:NetworkPlannerVisualizerChildFeature = feature.properties
                            return(
                                <div key={index} className={"MapPopUpFeature"}>
                                    <span><b>Name: </b> {propertiesC.name}</span>
                                    <span><b>Type: </b> {propertiesC.deviceType}</span>
                                    <span><b>Origin: </b> {propertiesC.originParent}</span>
                                    <span><b>Current: </b> {propertiesC.currentParent}</span>
                                    <span><b>- - - - - - - -</b></span>
                                </div>
                            )
                        } 
                    })
                }
            </div>
        )
    }
}

export default VisualizerMapPopup
