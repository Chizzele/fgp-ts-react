import React, { Component } from 'react'
import { DeviceWidgetPropsInterface, DeviceWidgetStateInterface } from './DeviceWidgetInterfaces';
import './DeviceWidget.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export class DeviceWidget extends Component<DeviceWidgetPropsInterface, DeviceWidgetStateInterface> {
    constructor(props:DeviceWidgetPropsInterface){
        super(props);
        this.state = {
            breadCrumbsExpanded : this.props.breadCrumbsExpanded !== undefined ? this.props.breadCrumbsExpanded : false,
            detailsExpanded : this.props.detailsExpanded !== undefined ? this.props.detailsExpanded : true,
            mapExpanded : this.props.mapExpanded !== undefined ? this.props.mapExpanded : true,
            widgetExpanded : this.props.widgetExpanded !== undefined ? this.props.widgetExpanded : true
        }
        this.toggleWidgetExpanded = this.toggleWidgetExpanded.bind(this);
    }

        // SHRINKING CODE
        // const elementsToShrink = document.getElementsByClassName("__TS_SHRINK_ME_"); 
        // if(elementsToShrink.length > 0){
        //     for(var x = 0; x < elementsToShrink.length; x++){
        //         let elem = elementsToShrink[x];
        //         elem.setAttribute('style', "zoom:1")
        //     }
        // }

    toggleWidgetExpanded = () => {
        
        if(this.props.toggleWidgetExpandedCb === undefined){
            this.setState({
                widgetExpanded : !this.state.widgetExpanded
            })
        }else{
            this.setState({
                widgetExpanded : !this.state.widgetExpanded
            }, () => {this.props.toggleWidgetExpandedCb? this.props.toggleWidgetExpandedCb(this.state.widgetExpanded) : null})
        }
    }

    render() {
        return (
            <div>
                {/* Widget Expanding Buttons */}
                <div className={this.state.widgetExpanded ? "DeviceWidgetExpand" : "DeviceWidgetExpand closed"}>
                    {
                        this.state.widgetExpanded ? (
                            <div className={"DeviceWidgetExpand-icon"} onClick={this.toggleWidgetExpanded}>
                                <FontAwesomeIcon icon="compress-alt" />
                            </div>
                            
                        ) : (
                            <div className={"DeviceWidgetExpand-icon"} onClick={this.toggleWidgetExpanded}>
                                <FontAwesomeIcon icon="expand-alt" />
                            </div>
                        )
                    }
                </div>
                <div className={this.state.widgetExpanded === true ? "TS-fgReact_componentContainer" : "TS-fgReact_componentContainer closed"}>
                    {
                        this.state.widgetExpanded === true ? (
                            <div className={"d-flex"}>
                                <div className={this.state.breadCrumbsExpanded === true ? "DeviceWidget-section DeviceWidget-section-breadCrumb" : "DeviceWidget-section DeviceWidget-section-breadCrumb closed" }>
                                    <h5>Hierarchy</h5>
                                </div>
                                <div className={this.state.detailsExpanded === true ? "DeviceWidget-section DeviceWidget-section-details" : "DeviceWidget-section DeviceWidget-section-details closed" }>
                                    <h5>Details</h5>
                                </div>
                                <div className={this.state.mapExpanded === true ? "DeviceWidget-section DeviceWidget-section-map" : "DeviceWidget-section DeviceWidget-section-map closed" }>
                                    <h5>Map</h5>
                                </div>
                            </div>
                        ) : (
                            ""
                        )
                    }
                    
                </div>
            </div>
        )
    }
}

export default DeviceWidget
