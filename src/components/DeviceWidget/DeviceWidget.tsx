import React, { Component } from 'react'
import { DeviceWidgetPropsInterface, DeviceWidgetStateInterface } from './DeviceWidgetInterfaces';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import './DeviceWidget.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export class DeviceWidget extends Component<DeviceWidgetPropsInterface, DeviceWidgetStateInterface> {
    constructor(props:DeviceWidgetPropsInterface){
        super(props);
        const defaultTab:ContentTab[] = [{
            title : "Main View",
            id : "01",
            hasContent : true,
            active : true
        }]
        this.state = {
            breadCrumbsExpanded : this.props.breadCrumbsExpanded !== undefined ? this.props.breadCrumbsExpanded : true,
            detailsExpanded : this.props.detailsExpanded !== undefined ? this.props.detailsExpanded : true,
            mapExpanded : this.props.mapExpanded !== undefined ? this.props.mapExpanded : true,
            widgetExpanded : this.props.widgetExpanded !== undefined ? this.props.widgetExpanded : true,
            zoomLevel : 1,
            zoomHandler : this.props.zoomHandler !== undefined ? this.props.zoomHandler : true,
            cssClassesToShrink : this.props.cssClassesToShrink !== undefined ? this.props.cssClassesToShrink.concat(["__TS_SHRINK_ME__"]) : ["__TS_SHRINK_ME__"],
            topTabs : this.props.topTabs !== undefined ? defaultTab.concat(this.props.topTabs) : defaultTab
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

    // swap the tab and whasts been shown
    swapTab(id:string){
        console.log('hit swapper', id)
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

    componentDidMount(){
        console.log('props', this.props, this.state)
    }

    render() {
        const sampleBreadCrumbs:CrumbArr = [
            {
                deviceType : "ICP",
                deviceTypeShortName : "ICP",
                deviceName : "icp_9829383",
                deviceDescription : "9829383",
                linkTo : "/Icp/9829383",
                image : "icp"
            },
            {
                deviceType : "LV Circuit",
                deviceTypeShortName : "LVC",
                deviceName : "lvc_00293841dddde2",
                deviceDescription : "Lowest V Circuit",
                linkTo : "/Lvc/lvc_00293841dddde2",
                image : "circuit"
            },
            {
                deviceType : "Transformer",
                deviceTypeShortName : "TX",
                deviceName : "tx_00293841dddde2",
                deviceDescription : "AutoBot DeceIcon",
                linkTo : "/Transformer/tx_00293841",
                image : "transformer"
            },
            {
                deviceType : "Substation",
                deviceTypeShortName : "SUB",
                deviceName : "sb_9834",
                deviceDescription : "Subzero Stat",
                linkTo : "/Substation/sb_9834",
                image : "substation"
            },
            {
                deviceType : "Feeder",
                deviceTypeShortName : "FDR",
                deviceName : "fdr_983",
                deviceDescription : "eBig Feeder",
                linkTo : "/Feeder/fdr_983",
                image : "feeder"
            },
            {
                deviceType : "GXP",
                deviceTypeShortName : "GXP",
                deviceName : "gxp_01",
                deviceDescription : "GxP 01",
                linkTo : "/Gxp/gxp_01",
                image : "gxp"
            }
        ]
        return (
            <div>
                {/* Display Tab Buttons */}
                {
                    this.state.topTabs.length > 1 ? (
                        <div className={this.state.widgetExpanded ? "DeviceWidgetExpand" : "DeviceWidgetExpand closed"}>
                        {
                            this.state.topTabs.map((tab, index) => {
                                return(
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
                    ) : (
                        <div className={this.state.widgetExpanded ? "DeviceWidgetExpand" : "DeviceWidgetExpand closed"}>
                            <button className={"DeviceWidgetExpand-icon viewTabs selected"} 
                                onClick={this.zoomOutHandler}
                                disabled={true}
                            >
                                Main View
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
                            {
                                this.state.topTabs.length > 1 ? (
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
                                                                <Breadcrumbs 
                                                                    isExtended={this.state.breadCrumbsExpanded}
                                                                    crumbs={sampleBreadCrumbs}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className={this.state.detailsExpanded === true ? "DeviceWidget-section DeviceWidget-section-details DeviceWidget-section-border" : "DeviceWidget-section DeviceWidget-section-details closed DeviceWidget-section-border" }>
                                                            <div className={"DeviceWidget-section-collapseCont"}>
                                                                <button className={"DeviceWidgetExpand-icon DeviceWidgetExpand-icon-sections"} title={"toggle device extension details view"} onClick={this.toggleDetailsExpanded} style={{"right" : "-19px"}}>
                                                                    <FontAwesomeIcon icon={this.state.detailsExpanded ? "angle-double-left" : "angle-double-right"} />
                                                                </button>
                                                            </div>
                                                            details
                                                        </div>
                                                        <div className={this.state.mapExpanded === true ? "DeviceWidget-section DeviceWidget-section-map" : "DeviceWidget-section DeviceWidget-section-map closed" }>
                                                            map here
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
                                ) : (
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
                                            map here
                                        </div>
                                    </div>
                                )
                            }

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
                                                         Device Type : Device Name/Description
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
                                "Device Type : Device Name/Description"
                            )
                        )
                    }
                    
                </div>
            </div>
        )
    }
}

export default DeviceWidget
