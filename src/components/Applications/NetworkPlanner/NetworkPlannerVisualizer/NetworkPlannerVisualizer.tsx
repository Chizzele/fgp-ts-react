import React, { Component } from 'react'
import { NetworkPlannerVisualizerPropsInterface, NetworkPlannerVisualizerStateInterface } from './NetworkPlannerVisualizerInterfaces';
import {createParentLayer, createChildLayer} from '../NetworkPlannerLoadHelpers/NwpVisualizerLoadHelper';
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
            mapCenter : []
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
        let layers:VectorLayer[] = [];
        let layersParent:VectorLayer[] = [];
        let layersChildren:VectorLayer[] = [];
        let points:number[][] = [];
        parentDevices.forEach((device:NetworkPlannerVisualizerParentFeature, index:number) =>{
            const layer = createParentLayer(device, index);
            const childLayer = createChildLayer(device.completeCurrentChildren, index)
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

    moveChild(map:any, event:any){
        map.forEachFeatureAtPixel(event.pixel, (feature:any) => {
            let featureProperties = feature.getProperties().properties;
            var fromLayerMatchIndex:number
            var featureMatchIndex:number;
            var toLayerMatchIndex:number;
            var toLayerSource:any;
            if (featureProperties.isParent === false){
                console.log('im a child yay')
                // now to find where the feature is to push it 
                let childLayers:any[] = [...this.state.layersChildren];
                childLayers.forEach((layer:any , indexL:number) =>{
                    if(layer.getProperties().parentDeviceId === featureProperties.currentParent){
                        // layer found
                        let features:any = layer.getSource().getFeatures()
                        let source:any = layer.getSource();
                        features.forEach( (feature:any, indexF:number) =>{
                            if(feature.getProperties().properties.name === featureProperties.name){
                                // found layer and meter, setting indexes
                                fromLayerMatchIndex = indexL
                                featureMatchIndex = indexF;
                                // setting layer to either next layer if exists, or cycle to start
                                childLayers[fromLayerMatchIndex + 1] !== undefined ? toLayerMatchIndex = fromLayerMatchIndex + 1 : toLayerMatchIndex = 0;
                                toLayerSource = childLayers[toLayerMatchIndex].getSource();
                                // copying properties to the feature
                                let newFeatureProps:any = {...featureProperties};
                                newFeatureProps.currentParent = childLayers[toLayerMatchIndex].getProperties().parentDeviceId
                                feature.setProperties({properties: newFeatureProps});
                                // adding feature to layer and splicing from old 
                                source.removeFeature(source.getFeatures()[featureMatchIndex])
                                toLayerSource.addFeature(feature)
                                this.setState({
                                    layersChildren : childLayers
                                },() => {
                                    console.log('layers updated')
                                    this.updateGraphs()
                                })
                            }
                        })
                    }   
                })

            }else{
                console.log('im not a child nooo')
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
                                        this.props.selectionRows.map((device, index) => {
                                            return (
                                                <div key={index} className={this.state.mapVisible ? " zl-"+(this.state.scaleFactor*100)+" nwpPlanningGraphs fgReact_componentContainer m-bot-0" : " zl-"+(this.state.scaleFactor*100)+" nwpPlanningGraphs fgReact_componentContainer m-bot-0 nwpSelectionGraphs-mapHide"}>
                                                    {/* <div className={"nwpSelectionGraphsInner"} id={`pvg_${substation.id}`}>
                                                            <FontAwesomeIcon className="" icon={["fas", "eye-slash"]}/>
                                                    </div> */}
                                                    <div className={"planningDissubGraphTitle"}> {device.description} </div>

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
