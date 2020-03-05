import React, { Component } from 'react'
import { DeviceWidgetPropsInterface, DeviceWidgetStateInterface } from './DeviceWidgetInterfaces';
import './DeviceWidget.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export class DeviceWidget extends Component<DeviceWidgetPropsInterface, DeviceWidgetStateInterface> {
    constructor(props:DeviceWidgetPropsInterface){
        super(props);
        const defaultTab:ContentTab = {
            title : "Main View",
            content : true
        }
        this.state = {
            breadCrumbsExpanded : this.props.breadCrumbsExpanded !== undefined ? this.props.breadCrumbsExpanded : true,
            detailsExpanded : this.props.detailsExpanded !== undefined ? this.props.detailsExpanded : true,
            mapExpanded : this.props.mapExpanded !== undefined ? this.props.mapExpanded : true,
            widgetExpanded : this.props.widgetExpanded !== undefined ? this.props.widgetExpanded : true,
            zoomLevel : 1,
            zoomHandler : this.props.zoomHandler !== undefined ? this.props.zoomHandler : true,
            cssClassesToShrink : this.props.cssClassesToShrink !== undefined ? this.props.cssClassesToShrink.concat(["__TS_SHRINK_ME__"]) : ["__TS_SHRINK_ME__"],
            topTabs : this.props.topTabs !== undefined ? this.props.topTabs.concat([defaultTab]) : [defaultTab]

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

    // toggles the map expansion, calls callback if provided
    toggleMapExpanded = () => {        
        if(this.props.toggleMapExpandedCb === undefined){
            this.setState({
                mapExpanded : !this.state.mapExpanded
            })
        }else{
            this.setState({
                mapExpanded : !this.state.mapExpanded
            }, () => {this.props.toggleMapExpandedCb? this.props.toggleMapExpandedCb(this.state.mapExpanded) : null})
        }
    }

    // toggles the details expansion, calls callback if provided
    toggleDetailsExpanded = () => {        
        if(this.props.toggleDetailsExpandedCb === undefined){
            this.setState({
                detailsExpanded : !this.state.detailsExpanded
            })
        }else{
            this.setState({
                detailsExpanded : !this.state.detailsExpanded
            }, () => {this.props.toggleDetailsExpandedCb? this.props.toggleDetailsExpandedCb(this.state.detailsExpanded) : null})
        }
    }

    // toggles the breadcrumbs expansion, calls callback if provided
    toggleBreadcrumbsExpanded = () => {        
        if(this.props.toggleBreadCrumbsExpandedCb === undefined){
            this.setState({
                breadCrumbsExpanded : !this.state.breadCrumbsExpanded
            })
        }else{
            this.setState({
                breadCrumbsExpanded : !this.state.breadCrumbsExpanded
            }, () => {this.props.toggleBreadCrumbsExpandedCb? this.props.toggleBreadCrumbsExpandedCb(this.state.breadCrumbsExpanded) : null})
        }
    }

    render() {
        return (
            <div>
                {/* Display Tab Buttons */}
                {
                    this.state.topTabs.length > 1 ? (
                        <div className={this.state.widgetExpanded ? "DeviceWidgetExpand" : "DeviceWidgetExpand closed"}>
                        {
                            this.state.topTabs.map((tab, index) => {
                                <button className={"DeviceWidgetExpand-icon viewTabs"} 
                                    onClick={this.zoomOutHandler}
                                    disabled={false}
                                    style={{"left" : `${index*20}px`}}
                                >
                                 {tab.title}
                                </button>
                            })
                        } 
                        
                        </div>
                    ) : (
                        <div className={this.state.widgetExpanded ? "DeviceWidgetExpand" : "DeviceWidgetExpand closed"}>
                            <button className={"DeviceWidgetExpand-icon viewTabs selected"} 
                                onClick={this.zoomOutHandler}
                                disabled={true}
                            >
                                Main View
                            </button>
                            <button className={"DeviceWidgetExpand-icon viewTabs"} 
                                onClick={this.zoomOutHandler}
                                disabled={true}
                                style={{"left": "130px"}}
                            >
                                Second View
                            </button>
                        </div> 
                    )
                }
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
                {/* Widget Expanding Button */}
                <div className={this.state.widgetExpanded ? "DeviceWidgetExpand" : "DeviceWidgetExpand closed"}>
                    {
                        <button className={"DeviceWidgetExpand-icon"} onClick={this.toggleWidgetExpanded}>
                            <FontAwesomeIcon icon={this.state.widgetExpanded ? "compress-alt" : "expand-alt"} />
                        </button>
                    }
                </div>
                <div className={this.state.widgetExpanded === true ? "TS-fgReact_componentContainer" : "TS-fgReact_componentContainer closed"}>
                    {
                        this.state.widgetExpanded === true ? (
                            <div className={"d-flex w-100"}>
                                <div className={this.state.breadCrumbsExpanded === true ? "DeviceWidget-section DeviceWidget-section-breadCrumb" : "DeviceWidget-section DeviceWidget-section-breadCrumb closed" }>
                                    <div className={"DeviceWidget-section-collapseCont"}>
                                        <button className={"DeviceWidgetExpand-icon DeviceWidgetExpand-icon-sections"} onClick={this.toggleBreadcrumbsExpanded}>
                                            <FontAwesomeIcon icon={this.state.breadCrumbsExpanded ? "angle-double-left" : "angle-double-right"} />
                                        </button>
                                    </div>
                                    <div>
                                        crumbs
                                    </div>
                                </div>
                                <div className={this.state.detailsExpanded === true ? "DeviceWidget-section DeviceWidget-section-details DeviceWidget-section-border" : "DeviceWidget-section DeviceWidget-section-details closed DeviceWidget-section-border" }>
                                    <div className={"DeviceWidget-section-collapseCont"}>
                                        <button className={"DeviceWidgetExpand-icon DeviceWidgetExpand-icon-sections"} onClick={this.toggleDetailsExpanded} style={{"right" : "-19px"}}>
                                            <FontAwesomeIcon icon={this.state.detailsExpanded ? "angle-double-left" : "angle-double-right"} />
                                        </button>
                                    </div>
                                    details
                                </div>
                                <div className={this.state.mapExpanded === true ? "DeviceWidget-section DeviceWidget-section-map" : "DeviceWidget-section DeviceWidget-section-map closed" }>
                                    {/* <div className={"DeviceWidget-section-collapseCont"}>
                                        <button className={"DeviceWidgetExpand-icon"} onClick={this.toggleMapExpanded}>
                                            <FontAwesomeIcon icon={this.state.mapExpanded ? "angle-double-left" : "expand-alt"} />
                                        </button>
                                    </div> */}
                                    map here
                                </div>
                            </div>
                        ) : (
                            "Im collapsed"
                        )
                    }
                    
                </div>
            </div>
        )
    }
}

export default DeviceWidget
