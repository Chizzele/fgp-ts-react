import React, { Component } from 'react'
import { NetworkPlannerVisualizerPropsInterface, NetworkPlannerVisualizerStateInterface } from './NetworkPlannerVisualizerInterfaces';
import {createParentLayer, createChildLayer, buildGraphConfig} from '../NetworkPlannerLoadHelpers/NwpVisualizerLoadHelper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {NetworkPlannerVisualizerMap} from './NetworkPlannerVisualizerMap/NetworkPlannerVisualizerMap'
import './NetworkPlannerVisualizer.css';
// import Feature from 'ol/Feature';
// import {Fill, Stroke, Circle, Style} from 'ol/style'; 
// import Point from 'ol/geom/Point';
// import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
// import { layer } from '@fortawesome/fontawesome-svg-core';
// import { layer } from '@fortawesome/fontawesome-svg-core';

export class NetworkPlannerVisualizer extends Component<NetworkPlannerVisualizerPropsInterface, NetworkPlannerVisualizerStateInterface> {
    constructor(props:NetworkPlannerVisualizerPropsInterface){
        super(props);
        this.state = {
            map : null,
            layers : [],
            addDummy : false,
            mapVisible : true,
            rowsProcessed : true,
            scaleFactor : 1,
            visualizerReady : false,
            completeParents : [],
            completeChildren : [],
            layersChildren : [],
            layersParent : [],
            mapCenter : [],
            tracker : []
        }
        this.prepareVisualizer = this.prepareVisualizer.bind(this)
        this.visualizeData = this.visualizeData.bind(this);
        this.collector = this.collector.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
        this.addDummy = this.addDummy.bind(this);
        this.moveChild = this.moveChild.bind(this);
    }

    prepareVisualizer(){
        let selectionRows = [...this.props.selectionRows];
        let parentLocationUrl:string = `${this.props.baseUrl}${this.props.config.devices.parent.deviceType}`;
        //  getting all parent names
        let parentNames:string[] = selectionRows.map(r=>r.name); 
        //  getting all child names
        let childNames:string[] = [];
        selectionRows.forEach((row:NetworkPlannerSelectorRow) => {
            childNames.push(...row.childrenAssigned)
        });
        // gets the location back  for the parents
        axios.post(parentLocationUrl , {devices:parentNames, extensions:[`${this.props.config.devices.parent.locationExtensionName}`]})
        .then((resp:any) => {
            resp.data.forEach(async(device:any) => {
                // creating a device with name, id, type and location (form [lon,lat]);
                let rowIndex = selectionRows.map(r=>r.id).indexOf(device.device.name)
                let listOfDevices:DeviceWithExtensions[] = [];
                let completeDevice:NetworkPlannerVisualizerParentFeature = {
                    name : device.device.name,
                    location : [device[`${this.props.config.devices.parent.locationExtensionName}`][`${this.props.config.devices.parent.locationExtensionLatLonFields[0]}`], device[`${this.props.config.devices.parent.locationExtensionName}`][`${this.props.config.devices.parent.locationExtensionLatLonFields[1]}`]],
                    id : device.device.name,
                    deviceType : this.props.config.devices.parent.deviceType,
                    currentChildren : listOfDevices,
                    completeCurrentChildren : [],
                    isParent : true
                }
                // now get the location of these children 
                let childLocationUrl:string = `${this.props.baseUrl}${this.props.config.devices.child.deviceType}`;
                axios.post(childLocationUrl, {devices:selectionRows[rowIndex].childrenAssigned, extensions:[`${this.props.config.devices.child.locationExtensionName}`]})
                .then((resp:any)=> {
                    let childDeviceCollection:NetworkPlannerVisualizerChildFeature[] = [];
                    resp.data.forEach((device:any) => {
                        childDeviceCollection.push({
                            deviceType : this.props.config.devices.child.deviceType,
                            location : [device[`${this.props.config.devices.child.locationExtensionName}`][`${this.props.config.devices.child.locationExtensionLatLonFields[0]}`], device[`${this.props.config.devices.child.locationExtensionName}`][`${this.props.config.devices.child.locationExtensionLatLonFields[1]}`]],
                            name : device.device.name,
                            id : device.device.name,
                            currentParent : selectionRows[rowIndex].name,
                            originParent : selectionRows[rowIndex].name,
                            isParent : false
                        })
                        completeDevice.completeCurrentChildren.push({
                            id : device.device.name,
                            name : device.device.name,
                            deviceType : this.props.config.devices.child.deviceType,
                            location : [device[`${this.props.config.devices.child.locationExtensionName}`][`${this.props.config.devices.child.locationExtensionLatLonFields[0]}`], device[`${this.props.config.devices.child.locationExtensionName}`][`${this.props.config.devices.child.locationExtensionLatLonFields[1]}`]],
                            originParent : completeDevice.name,
                            currentParent : completeDevice.name,
                            isParent : false
                        })
                        completeDevice.currentChildren.push(
                            {
                                name : device.device.name,
                                description : device.device.description,
                                type : this.props.config.devices.child.deviceType,
                                extensions : {
                                    location : [device[`${this.props.config.devices.child.locationExtensionName}`][`${this.props.config.devices.child.locationExtensionLatLonFields[0]}`], device[`${this.props.config.devices.child.locationExtensionName}`][`${this.props.config.devices.child.locationExtensionLatLonFields[1]}`]]
                                }
                            }
                        )
                        
                    })
                    this.collector(completeDevice, childDeviceCollection)
                })  
            })
            
        });


    }

    collector(parentDevice:NetworkPlannerVisualizerParentPreType, childDeviceCollection:NetworkPlannerVisualizerChildPreType[]){     
        let tempParents:NetworkPlannerVisualizerParentPreType[] = [...this.state.completeParents];
        let tempChildren:NetworkPlannerVisualizerChildPreType[] = [...this.state.completeChildren]
        tempParents.push(parentDevice)
        tempChildren.push(...childDeviceCollection)
        if(this.state.completeParents.length + 1 === this.props.selectionRows.length){
            this.setState({
                completeParents : tempParents,
                completeChildren : tempChildren
            }, this.visualizeData)
        }else{
            this.setState({
                completeParents : tempParents,
                completeChildren : tempChildren
            })
        }
    }

    visualizeData(){
        console.log('visualizing data..')

        // Making maps, layers, features
        let parentDevices = [...this.state.completeParents];
        let dataLines = [...this.props.rawDataLines];
        let layers:VectorLayer[] = [];
        let layersParent:VectorLayer[] = [];
        let layersChildren:VectorLayer[] = [];
        let points:number[][] = [];
        parentDevices.forEach((device:NetworkPlannerVisualizerParentFeature, index:number) =>{
            const layer = createParentLayer(device, index);
            const childLayer = createChildLayer(device.completeCurrentChildren, index)
            const graphConfigs:any =  buildGraphConfig();
            var parentLinesIndex:number = 0;
            var childLinesIndex:number = 0;
            console.log( "graphConfig",  graphConfigs)
            dataLines.forEach((entry:NetworkPlannerDataLineCollection, indexX:number) => {
                if(entry.id === device.id){
                    if(entry.isParent === true){
                        parentLinesIndex = indexX;
                    }else if(entry.isParent === false){
                        childLinesIndex = indexX;
                    }
                }
                
            })
            console.log(childLinesIndex,parentLinesIndex )
            let parentLines:NetworkPlannerDataLineCollection = dataLines[parentLinesIndex];
            let childLines:NetworkPlannerDataLineCollection = dataLines[childLinesIndex];
            let maxIntervalsParent:number = parentLines.originLines[0].data.length;
            let childIntervalLengths:number[] = childLines.originLines.map((entry:any)=>entry.data.length)
            let maxIntervalsChild:number = Math.max(...childIntervalLengths);
            console.log(maxIntervalsChild, maxIntervalsParent, "max intervals (child/parent)")

            

            layersParent.push(layer)
            layersChildren.push(childLayer)
            layers.push(layer,childLayer);
            points.push([device.location[1], device.location[0]])
        });
        const center = [parentDevices[0].location[0], parentDevices[0].location[1]]
        
        // making graphs
        


        // setting state 
        this.setState({
            layers : layers,
            layersChildren : layersChildren,
            layersParent : layersParent,
            visualizerReady : true,
            mapCenter : center
        }, () => {console.log('layers added')})
        // build the parent map layers

    }


    findFeatureInLayer(){

    }

    updateGraphs(){
        console.log('graphs updating')
    }

    getChildDataLine(childFeature:NetworkPlannerVisualizerChildFeature){
        let subset:any = this.props.rawDataLines.filter(r=>r.id === childFeature.originParent && r.isParent === false)
        let featureDataLine = subset[0].originLines.filter((l:any) =>l.id === childFeature.name)
        return featureDataLine
    }

    processFeature(feature:any, featureProperties:NetworkPlannerVisualizerChildFeature, source:any, indexL:number, indexF:number):processDataResultNWP{
        let completeParents = [...this.state.completeParents];
        let completeChildren = [...this.state.completeChildren];
        let childLayers:any[] = [...this.state.layersChildren];
        let newParent:string;
        let fromLayerMatchIndex:number = indexL
        let featureMatchIndex:number = indexF;
        let toLayerMatchIndex:number ;
        // setting layer to either next layer if exists, or cycle to start
        childLayers[fromLayerMatchIndex + 1] !== undefined ? toLayerMatchIndex = fromLayerMatchIndex + 1 : toLayerMatchIndex = 0;
        let toLayerSource = childLayers[toLayerMatchIndex].getSource();
        // copying properties to the feature
        let newFeatureProps:any = {...featureProperties};
        newParent = childLayers[toLayerMatchIndex].getProperties().parentDeviceId
        newFeatureProps.currentParent = newParent
        // finding in the complete devices
        let fromCompleteParentIndex:number = completeParents.map(r => r.name).indexOf(featureProperties.currentParent);
        let fromCompleteParent:NetworkPlannerVisualizerParentPreType = completeParents[fromCompleteParentIndex]
        let toCompleteParentIndex:number = completeParents.map(r => r.name).indexOf(newParent);
        let toCompleteParent:NetworkPlannerVisualizerParentPreType = completeParents[toCompleteParentIndex];
        // removing from original device
        let oldIndex:number = fromCompleteParent.currentChildren.map(d => d.name).indexOf(featureProperties.name)
        let oldIndexComplete:number = fromCompleteParent.completeCurrentChildren.map(d => d.name).indexOf(featureProperties.name)
        //modify the feature to update the parent
        fromCompleteParent.completeCurrentChildren[oldIndexComplete].currentParent = newParent
        // adding in the feature
        toCompleteParent.currentChildren.push(fromCompleteParent.currentChildren[oldIndex])
        toCompleteParent.completeCurrentChildren.push(fromCompleteParent.completeCurrentChildren[oldIndexComplete])
        // removing the feature 
        fromCompleteParent.currentChildren.splice(oldIndex,1);
        fromCompleteParent.completeCurrentChildren.splice(oldIndexComplete, 1);
        feature.setProperties({properties: newFeatureProps});
        // setting the child right
        let childOldIndex:number = completeChildren.map(r => r.name).indexOf(featureProperties.name);
        completeChildren[childOldIndex].currentParent = newParent;
        // adding feature to layer and splicing from old 
        source.removeFeature(source.getFeatures()[featureMatchIndex])
        toLayerSource.addFeature(feature)
        return {
            fromParent : featureProperties.originParent,
            toParent : newParent,
            childId : featureProperties.name,
            childLayers : childLayers,
            completeParents : completeParents,
            completeChildren : completeChildren
        }
    }

    getParentsFromFeature(featureProperties:NetworkPlannerVisualizerChildFeature):processDataResultNWP{
        let childLayers:any[] = [...this.state.layersChildren];
        let returnThing:processDataResultNWP = {
            childId : "",
            childLayers : [],
            completeChildren : [],
            completeParents : [],
            fromParent : "",
            toParent : ""
        };
        childLayers.forEach(async(layer:any , indexL:number) =>{
            if(layer.getProperties().parentDeviceId === featureProperties.currentParent){
                let features:any = layer.getSource().getFeatures()
                let source:any = layer.getSource();
                await features.forEach((feature:any, indexF:number) =>{
                    if(feature.getProperties().properties.name === featureProperties.name){
                        let blah:processDataResultNWP = this.processFeature(feature, featureProperties, source, indexL, indexF) 
                        returnThing.childId = blah.childId;
                        returnThing.childLayers = blah.childLayers;
                        returnThing.completeChildren = blah.completeChildren;
                        returnThing.completeParents = blah.completeParents;
                        returnThing.fromParent = blah.fromParent
                        returnThing.toParent = blah.toParent

                    }else{
                        returnThing.childId = "";
                        returnThing.childLayers = [];
                        returnThing.completeChildren = [];
                        returnThing.completeParents = [];
                        returnThing.fromParent = ""
                        returnThing.toParent = ""
                    }
                })
            }
        })
        return returnThing
    }

    moveChild(map:any, event:any){
        map.forEachFeatureAtPixel(event.pixel, (feature:any) => {
            let featureProperties = feature.getProperties().properties;
            if (featureProperties.isParent === false){
                // now to find where the feature is to push it 
                let processedResults:processDataResultNWP = this.getParentsFromFeature(featureProperties)
                let tracker = [...this.state.tracker];
                let trackerIndex = tracker.map(r=>r.childId).indexOf(featureProperties.name)
                let childDataLine = this.getChildDataLine(featureProperties)
                let trackerObj:trackerNWP = {
                    childId : processedResults.childId,
                    fromParent : processedResults.fromParent,
                    toParent : processedResults.toParent,
                    data : childDataLine,
                    index : tracker.length + 1
                }
                if(trackerIndex === -1){
                    tracker.push(trackerObj)
                }else{
                    tracker[trackerIndex] = trackerObj
                }

                this.setState({
                    completeChildren : processedResults.completeChildren,
                    completeParents : processedResults.completeParents,
                    layersChildren : processedResults.childLayers,
                    tracker
                })
                
            }else{
                
            }
        })
    }

    

    addDummy(map:any, event:any){
        console.log("add dummy," , map, event)
        this.toggleAddDummy(
            () => {
                let parents= [...this.state.completeParents];
                let layersParent = [...this.state.layersParent];
                let layersChildren = [...this.state.layersChildren];
                let layers = [...this.state.layers]
                const coords = map.getCoordinateFromPixel(event.pixel)
                console.log("coords,", coords)
                const dummyId = parents.length + 1;
                let dummyCompleteParent:NetworkPlannerVisualizerParentPreType = {
                    deviceType : parents[0].deviceType,
                    location : coords,
                    name : `Dummy-${parents[0].deviceType}-${dummyId}`,
                    currentChildren : [],
                    completeCurrentChildren : [],
                    id : `Dummy-${parents[0].deviceType}-${dummyId}`
                } 
                let dummyCompleteFeature:NetworkPlannerVisualizerParentFeature = {
                    deviceType : parents[0].deviceType,
                    location : coords,
                    name : `Dummy-${parents[0].deviceType}-${dummyId}`,
                    id : `Dummy-${parents[0].deviceType}-${dummyId}`,
                    isParent : true,
                    currentChildren: [],
                    completeCurrentChildren: []
                }
                 
                let dummyLayer = createParentLayer(dummyCompleteFeature, dummyId)
                let dummyChildLayer = createChildLayer([], dummyId,`Dummy-${parents[0].deviceType}-${dummyId}`)
                layers.push(dummyLayer);
                layersParent.push(dummyLayer)
                layersChildren.push(dummyChildLayer)
                parents.push(dummyCompleteParent) 
                this.setState({
                    layers : layers,
                    completeParents : parents,
                    layersParent : layersParent,
                    layersChildren : layersChildren,
                    visualizerReady : true,
                },() => {console.log('dummy layer added')})
            }
        )
    }

    onClickHandler(map:any, event:any){
        if(this.state.addDummy === true){
            this.addDummy(map, event)
        }else{
            this.moveChild(map, event)
        }
    }

    toggleAddDummy(cb?:()=>void){
        if(cb === undefined){
            this.setState({
                addDummy : !this.state.addDummy
            })    
        }else{
            this.setState({
                addDummy : !this.state.addDummy
            }, cb)
        }
        
    }

    toggleMapVisibility(){

    }

    scale(){
        
    }

    componentDidMount(){
        this.prepareVisualizer()
    }

    render() {
        return (
            <div style={{"display" : "contents", "width" : "100%"}}>
                {this.state.visualizerReady === true ? (
                    <div 
                        style={{"left" : "0 !important", "width" : "100% !important"}} 
                        className={"fgReact_workingArea nwpVisualizerHelp"}
                        >
                        <div className={"nwpGoButton"}>
                            {/* Planning */}
                            <button className={this.state.addDummy ? 'btn btn-success' : this.state.completeParents.length > 4 || !this.state.mapVisible ? 'btn btn-secondary' : 'btn btn-primary'}
                                onClick={() => {this.state.completeParents.length > 4 ? null : this.toggleAddDummy()}}
                                title={"toggle dummy creation"} 
                                disabled={this.state.completeParents.length > 4 || !this.state.mapVisible}
                            >
                                <FontAwesomeIcon className="" icon={["fas", "plus"]} /> &nbsp;
                                Dummy
                            </button>
                            <button
                                className={this.state.mapVisible ? 'btn btn-primary ' : "btn btn-secondary "}
                                style={{ "marginRight": '10px' }}
                                onClick={this.toggleMapVisibility}
                                title={"toggle map visibility"}
                            >
                                <FontAwesomeIcon className="" icon={["fas", "eye-slash"]} />
                            </button>
                            <button className={'btn btn-primary'}
                                onClick={this.scale.bind(this,1)}
                                title={"Scale to 100%"} 
                            >
                                <FontAwesomeIcon className="" icon={["fas", "plus"]} /> &nbsp;
                                100%
                            </button>  
                            <button className={'btn btn-primary'}
                                onClick={this.scale.bind(this,0.75)}
                                title={"Scale to 75%"} 
                            >
                                <FontAwesomeIcon className="" icon={["fas", "plus"]} /> &nbsp;
                                75%
                            </button>  
                            <button className={'btn btn-primary'}
                                onClick={this.scale.bind(this,0.50)}
                                title={"Scale to 50%"} 
                            >
                                <FontAwesomeIcon className="" icon={["fas", "plus"]} /> &nbsp;
                                50%
                            </button>  
                        </div>
                        {
                            this.state.rowsProcessed === true ? (
                                <div className={"w-100 "}>
                                    {
                                        <NetworkPlannerVisualizerMap
                                            onClickHandler={this.onClickHandler}
                                            onDoubleClickHandler={()=>{console.log("double clicked")}}
                                            projection={this.props.config.map.projection}
                                            initialZoom={this.props.config.map.initialZoom}
                                            layers={this.state.layers}
                                            mapCenter={[1,1]}
                                            layerChildren={this.state.layersChildren}
                                            layersParents={this.state.layersParent}
                                        />
                                    }
                                    {
                                        this.state.completeParents.map((device, index) => {
                                            return (
                                                <div key={index} className={this.state.mapVisible ? " zl-"+(this.state.scaleFactor*100)+" nwpPlanningGraphs fgReact_componentContainer m-bot-0" : " zl-"+(this.state.scaleFactor*100)+" nwpPlanningGraphs fgReact_componentContainer m-bot-0 nwpSelectionGraphs-mapHide"}>
                                                    {/* <div className={"nwpSelectionGraphsInner"} id={`pvg_${substation.id}`}>
                                                            <FontAwesomeIcon className="" icon={["fas", "eye-slash"]}/>
                                                    </div> */}
                                                    <div className={"planningDissubGraphTitle"}> {device.name} </div>

                                                    <div className={"planningDissubGraph nwpSelectionGraphsInner "} id={`pcg_${device.id}`}>

                                                    </div>
                                                    <div className={"planningDissubGraph nwpSelectionGraphsInner "} id={`pcg_${device.id}_c`}>

                                                    </div>
                                                </div>

                                            )
                                        })
                                    }

                                </div>
                            ) : (
                                    "loading!"
                                )

                        }
                    </div>

                ):(
                    "visualizer loading"
                )}
            </div>
        )
    }
}

export default NetworkPlannerVisualizer
