import React, { Component } from 'react'
import { DeviceWidgetPropsInterface, DeviceWidgetStateInterface } from './DeviceWidgetInterfaces';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { DeviceDetails } from '../DeviceDetails/DeviceDetails';
import './DeviceWidget.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DeviceWidgetMap } from '../Maps/DeviceWidgetMap/DeviceWidgetMap'
import { getDeviceExtensions, getDeviceParents } from './DeviceWidgetHelpersV1';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {Fill, Stroke, Circle, Style} from 'ol/style'; 
export class DeviceWidget extends Component<DeviceWidgetPropsInterface, DeviceWidgetStateInterface> {
    constructor(props:DeviceWidgetPropsInterface){
        super(props);
        const defaultTab:ContentTab[] = [{
            title : "Main View",
            id : "01",
            hasContent : true,
            active : true
        }]
        const UrlDeviceType = window.location.pathname.split('/')[1]
        const UrlDeviceName = window.location.pathname.split('/')[2]
        const deviceWhilstLoading:DeviceWithExtensions = {
            name : UrlDeviceName,
            type : UrlDeviceType,
            description : UrlDeviceName,
            extensions:this.props.extensionNames?this.props.extensionNames.concat(["location"]):["location"]
        } 
        
        this.state = {
            breadCrumbsExpanded : this.props.breadCrumbsExpanded !== undefined ? this.props.breadCrumbsExpanded : true,
            detailsExpanded : this.props.detailsExpanded !== undefined ? this.props.detailsExpanded : true,
            mapExpanded : this.props.mapExpanded !== undefined ? this.props.mapExpanded : true,
            widgetExpanded : this.props.widgetExpanded !== undefined ? this.props.widgetExpanded : true,
            zoomLevel : 1,
            zoomHandler : this.props.zoomHandler !== undefined ? this.props.zoomHandler : true,
            cssClassesToShrink : this.props.cssClassesToShrink !== undefined ? this.props.cssClassesToShrink.concat(["__TS_SHRINK_ME__"]) : ["__TS_SHRINK_ME__"],
            topTabs : this.props.topTabs !== undefined ? defaultTab.concat(this.props.topTabs) : defaultTab,
            breadCrumbs : this.props.breadCrumbs !== undefined ? this.props.breadCrumbs : [],
            device : deviceWhilstLoading,
            triggerMapResize : false,
            couldntLoadDevice : false,
            deviceIsLoaded : false,
            layers : this.props.layers !== undefined ? this.props.layers : [],
            projection : this.props.projection !== undefined ? this.props.projection : "EPSG:4326",
            breadCrumbsLoaded : this.props.breadCrumbs !== undefined ? true : false
        }
    }

    componentDidMount(){
        this.getDevice();
    }

    buildMapLayer(){
        if(this.props.deviceLatLonFields !== undefined){
            if(this.state.device.extensions["location"] !== undefined){
                const deviceBaseStyle = new Style({
                    image : new Circle({
                        radius : 2,
                        stroke: new Stroke({
                            color : 'black',
                            width :  1,
                        }),
                        fill : new Fill({
                            color : 'red',
                        })
                    })
                })
                const deviceBaseFeature = new Feature({
                    geometry : new Point([this.state.device.extensions['location'][`${this.props.deviceLatLonFields[1]}`],this.state.device.extensions['location'][`${this.props.deviceLatLonFields[0]}`]]),
                    properties : {
                        name : this.state.device.name,
                        id : this.state.device.name,
                        description : this.state.device.description,
                        type : this.state.device.type
                    },
                    name:  this.state.device.name
                })

                const deviceBaseSource = new VectorSource({
                    features : [deviceBaseFeature]
                })
                const deviceBaseLayers = [
                    new VectorLayer({
                        source : deviceBaseSource,
                        style : deviceBaseStyle
                    })
                ];
                this.setState({
                    layers : this.state.layers.concat(deviceBaseLayers),
                    deviceIsLoaded : true,
                    couldntLoadDevice : false
                })
            }
        }else{
            this.setState({
                deviceIsLoaded : true,
                couldntLoadDevice : false
            })
        }
    }

    async getParents(){
        if(this.props.breadCrumbPath !== undefined){
            const crumbs = await getDeviceParents(this.props.baseUrl, this.state.device.name, this.props.breadCrumbPath)
            this.setState({
                breadCrumbs : crumbs,
                breadCrumbsLoaded : true
            })
        }
    }

    async getDevice(){
        const UrlDeviceType = window.location.pathname.split('/')[1]
        const UrlDeviceName = window.location.pathname.split('/')[2]
        const device = await getDeviceExtensions(this.props.baseUrl, UrlDeviceName, UrlDeviceType, this.state.device.extensions)
        if(device.name === "_fail_" && device.description === "_fail_" && device.type === "_fail_" && device.extensions[0] === "_fail_"){
            this.setState({
                deviceIsLoaded : false,
                couldntLoadDevice : true
            })
        }else{
            this.setState({
                device : device,
            },() => {
                this.buildMapLayer()
                this.getParents()
            })
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
            }, () => {
                this.triggerMapResize()
            })
        }else{
            this.setState({
                detailsExpanded : !this.state.detailsExpanded
            }, () => {
                this.triggerMapResize()
                this.props.toggleDetailsExpandedCb? this.props.toggleDetailsExpandedCb(this.state.detailsExpanded) : null
            })
        }
    }

    // toggles the breadcrumbs expansion, calls callback if provided
    toggleBreadcrumbsExpanded = () => {        
        if(this.props.toggleBreadCrumbsExpandedCb === undefined){
            this.setState({
                breadCrumbsExpanded : !this.state.breadCrumbsExpanded
            }, () => {
                this.triggerMapResize()
            })
        }else{
            this.setState({
                breadCrumbsExpanded : !this.state.breadCrumbsExpanded
            }, () => {
                this.triggerMapResize()
                this.props.toggleBreadCrumbsExpandedCb? this.props.toggleBreadCrumbsExpandedCb(this.state.breadCrumbsExpanded) : null
            })
        }
    }

    // swap the tab and whasts been shown
    swapTab(id:string){
        let tabsCopy = [...this.state.topTabs];
        let matchIndex = tabsCopy.findIndex((tab:ContentTab) => tab.id === id);
        for(var x  = 0; x < tabsCopy.length; x ++){
            if(x === matchIndex){
                tabsCopy[x].active = true;
            }else{
                tabsCopy[x].active = false;
            }
        }
        this.setState({
            topTabs : tabsCopy
        });
    }

    componentDidUpdate(){
    }
    
    triggerMapResize(){
        this.setState({
            triggerMapResize : !this.state.triggerMapResize
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.deviceIsLoaded ? (
                        <div>
                            {/* Display Tab Buttons */}
                            <div className={this.state.widgetExpanded ? "DeviceWidgetExpand" : "DeviceWidgetExpand closed"}>
                                    {
                                        this.state.topTabs.map((tab, index) => {
                                            return(
                                                // TODO :make into tab component
                                            <button className={ tab.active === true ? "DeviceWidgetExpand-icon viewTabs selected" : "DeviceWidgetExpand-icon viewTabs"} 
                                                onClick={() => this.swapTab(tab.id)}
                                                disabled={false}
                                                style={{"left" : `${index*130}px`}}
                                                key={index}
                                            >
                                            {tab.title}
                                            </button>
                                            )
                                        })
                                    } 
                                    
                                    </div>
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
                                                <div className={"d-flex w-100"}>
                                                    {/* first tab */}
                                                    {
                                                        this.state.topTabs.map((tab, index) => {
                                                            if(index === 0){
                                                                return(
                                                                <div id={tab.id} key={index} className={tab.active ? "d-flex w-100 tabbedContent active" : "d-flex w-100 tabbedContent"}>
                                                                    <div className={this.state.breadCrumbsExpanded === true ? "DeviceWidget-section DeviceWidget-section-breadCrumb" : "DeviceWidget-section DeviceWidget-section-breadCrumb closed" }>
                                                                        <div className={"DeviceWidget-section-collapseCont"}>
                                                                            <button className={"DeviceWidgetExpand-icon DeviceWidgetExpand-icon-sections"}  title={"toggle device hierarchy view"} onClick={this.toggleBreadcrumbsExpanded}>
                                                                                <FontAwesomeIcon icon={this.state.breadCrumbsExpanded ? "angle-double-left" : "angle-double-right"} />
                                                                            </button>
                                                                        </div>
                                                                        <div className={"DeviceWidget-section-container"}>
                                                                            {this.state.breadCrumbsLoaded === true ? (
                                                                                <Breadcrumbs 
                                                                                    isExtended={this.state.breadCrumbsExpanded}
                                                                                    crumbs={this.state.breadCrumbs}
                                                                                />
                                                                            ):(
                                                                                <FontAwesomeIcon spin icon="spinner"/>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                    <div className={this.state.detailsExpanded === true ? "DeviceWidget-section DeviceWidget-section-details DeviceWidget-section-border" : "DeviceWidget-section DeviceWidget-section-details closed DeviceWidget-section-border" }>
                                                                        <div className={"DeviceWidget-section-collapseCont"}>
                                                                            <button className={"DeviceWidgetExpand-icon DeviceWidgetExpand-icon-sections"} title={"toggle device extension details view"} onClick={this.toggleDetailsExpanded} style={{"right" : "-19px"}}>
                                                                                <FontAwesomeIcon icon={this.state.detailsExpanded ? "angle-double-left" : "angle-double-right"} />
                                                                            </button>
                                                                        </div>
                                                                        <DeviceDetails
                                                                            device={this.state.device}
                                                                            isExtended={this.state.detailsExpanded}
                                                                            processorConfig={this.props.processorConfig !== undefined ? this.props.processorConfig : undefined}
                                                                        />
                                                                    </div>
                                                                    <div className={this.state.mapExpanded === true ? "DeviceWidget-section DeviceWidget-section-map" : "DeviceWidget-section DeviceWidget-section-map closed" }>
                                                                        <DeviceWidgetMap 
                                                                            mapId={"map-1"}
                                                                            projection={this.state.projection}
                                                                            triggerResize={this.state.triggerMapResize}
                                                                            layers={this.state.layers[0] !== undefined ? this.state.layers : undefined}
                                                                            mapCenter={this.props.mapCenter !== undefined ? this.props.mapCenter : [this.state.device.extensions['location'][`${this.props.deviceLatLonFields[1]}`],this.state.device.extensions['location'][`${this.props.deviceLatLonFields[0]}`]]}
                                                                            zoomLevel={this.props.zoomLevel !== undefined ? this.props.zoomLevel : undefined}
                                                                            featureStyles={this.props.featureStyles !== undefined ? this.props.featureStyles : undefined}
                                                                            onDoubleClickCallBack={this.props.mapOnDoubleClickCallBack !== undefined ?  this.props.mapOnDoubleClickCallBack : undefined}
                                                                            onClickCallBack={this.props.mapOnClickCallBack !== undefined ?  this.props.mapOnClickCallBack : undefined}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                )
                                                            }
                                                            return(
                                                                <div id={tab.id} key={index} className={tab.active ? "d-flex w-100 tabbedContent active" : "d-flex w-100 tabbedContent"}>
                                                                    {tab.content !== undefined ? tab.content : "no content provided"}
                                                                </div>
                                                            )
                                                        })
                                                    }

                                                </div>
                                        </div>
                                    ) : (
                                        this.state.topTabs.length > 1 ? (
                                            <div className={"d-flex w-100"}>
                                                {/* first tab */}
                                                {
                                                    this.state.topTabs.map((tab, index) => {
                                                        if(index === 0){
                                                            return(
                                                                <div key={index} className={tab.active ? "d-flex w-100 tabbedContent active" : "d-flex w-100 tabbedContent"}>
                                                                    <b>{this.state.device.type.toUpperCase()}:</b> {this.state.device.name}
                                                                </div>
                                                            )
                                                        }else{
                                                            return(
                                                                <div key={index} className={tab.active ? "d-flex w-100 tabbedContent active" : "d-flex w-100 tabbedContent"}>
                                                                    {tab.collapsedContent !== undefined ? tab.collapsedContent : "Device Type : Device Name/Description"}
                                                                </div>
                                                            )
                                                        }
                                                        
                                                    })
                                                }
                                            </div>
                                        ) : (
                                            <div className={"d-flex w-100 tabbedContent active"}>
                                                <b>{this.state.device.type.toUpperCase()}:</b> &nbsp; {this.state.device.name}
                                            </div>
                                        )
                                    )
                                } 
                            </div>
                        </div>
                    ) : this.state.couldntLoadDevice ? (
                        "Could not establish connection with app, please check your internet connection"
                    ) : (
                        <div>
                            loading {this.state.device.type} <FontAwesomeIcon spin icon="spinner"/>
                        </div>
                    )
                }
            </div>
              
        )
    }
}

export default DeviceWidget
