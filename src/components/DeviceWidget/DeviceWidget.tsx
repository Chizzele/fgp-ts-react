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
            widgetExpanded : this.props.widgetExpanded !== undefined ? this.props.widgetExpanded : true,
            zoomLevel : 1,
            zoomHandler : this.props.zoomHandler !== undefined ? this.props.zoomHandler : true,
            cssClassesToShrink : this.props.cssClassesToShrink !== undefined ? this.props.cssClassesToShrink.concat(["__TS_SHRINK_ME__"]) : ["__TS_SHRINK_ME__"]
        }
    }

    // adjusts the zoom css propery of all HTML elements with the provided classnames + __TS_SHRINK_ME_
    resizeTargets = () => {
        this.state.cssClassesToShrink.forEach(cssClassName =>{
            const elementCollection:HTMLCollection = document.getElementsByClassName(cssClassName)
            for(let x  = 0; x < elementCollection.length; x ++){
                let elem = elementCollection[x];
                elem.setAttribute('style', `zoom:${this.state.zoomLevel}`)
            }
        })
        if(this.props.zoomHandlerCb !== undefined){
            this.props.zoomHandlerCb(this.state.zoomLevel)
        }
    }

    // increases the zoom level
    zoomInHandler = () =>{
        this.setState({
            zoomLevel : Math.round((this.state.zoomLevel + 0.2)*10)/10
        }, this.resizeTargets)
    }

    // decreases the zoom level
    zoomOutHandler = () =>{
        this.setState({
            zoomLevel : Math.round((this.state.zoomLevel - 0.2)*10)/10
        }, this.resizeTargets)
    }

    // toggles the widget expansion, calls callback if provided
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
                {/* Widget Zooming Buttons */}
                {
                    this.state.zoomHandler === true ? (
                        <div className={this.state.widgetExpanded ? "DeviceWidgetExpand" : "DeviceWidgetExpand closed"}>
                            <button className={this.state.zoomLevel < 0.5 ? "DeviceWidgetExpand-icon zoomMinus disabled" : "DeviceWidgetExpand-icon zoomMinus"} 
                                onClick={this.zoomOutHandler}
                                disabled={this.state.zoomLevel < 0.5}
                            >
                                <FontAwesomeIcon icon="search-minus" />
                            </button>
                            <button className={this.state.zoomLevel === 1 ? "DeviceWidgetExpand-icon zoomPlus disabled" : "DeviceWidgetExpand-icon zoomPlus"} 
                                onClick={this.zoomInHandler}
                                disabled={this.state.zoomLevel === 1}
                            >
                                <FontAwesomeIcon icon="search-plus" />
                            </button>
                        </div> 
                    ) : (
                        null
                    )
                }
                {/* Widget Expanding Buttons */}
                <div className={this.state.widgetExpanded ? "DeviceWidgetExpand" : "DeviceWidgetExpand closed"}>
                    {
                        this.state.widgetExpanded ? (
                            <button className={"DeviceWidgetExpand-icon"} onClick={this.toggleWidgetExpanded}>
                                <FontAwesomeIcon icon="compress-alt" />
                            </button>
                            
                        ) : (
                            <button className={"DeviceWidgetExpand-icon"} onClick={this.toggleWidgetExpanded}>
                                <FontAwesomeIcon icon="expand-alt" />
                            </button>
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
