import React, { Component } from 'react';
import { NetworkPlannerVisualizerMapPropsInterface, NetworkPlannerVisualizerMapStateInterface } from './NetworkPlannerVisualizerMapInterfaces';
import './NetworkPlannerVisualizerMap.css';
import * as ol from 'ol'
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM';
import {Fill, Stroke, Circle, Style} from 'ol/style'; 
import {VisualizerMapPopup} from './NetworkPlannerVisualizerMapPopup';

export class NetworkPlannerVisualizerMap extends Component<NetworkPlannerVisualizerMapPropsInterface, NetworkPlannerVisualizerMapStateInterface> {
    constructor(props:NetworkPlannerVisualizerMapPropsInterface){
        super(props);
        const baseStyle = new Style ({
            image : new Circle({
                radius : 2,
                stroke: new Stroke({
                    color : 'black',
                    width : 1,
                }),
                fill : new Fill({
                    color : 'red',
                })
            })
        })
        const baseFeatureSet:any = [];
        const baseSource = new VectorSource({
            features : baseFeatureSet
        })
        const baseLayers = [
            new TileLayer({
                source: new OSM()
            }),
            new VectorLayer({
                source : baseSource,
                style : baseStyle
            })
        ];
        const defaultZoomLevel = 8;
        this.state = {
            map : null,
            layers : baseLayers,
            zoomLevel :  defaultZoomLevel,
            projection : this.props.projection !== undefined ? this.props.projection : "EPSG:4326",
            focusedFeatures : [],
            highlightedFeatures : [],
            popupVisible : false,
        };
        this.initMap = this.initMap.bind(this)
        this.onZoomHandler = this.onZoomHandler.bind(this)
        

    }

    hoverHandler(event:any){
        let featureArr:any[] = [];
        this.state.map.forEachFeatureAtPixel(event.pixel, (feature:ol.Feature) => {
            const prop = feature.getProperties();
            if(prop && prop.name){
                featureArr.push(feature["values_"]);
            }    
        });
        this.setState({
            focusedFeatures : featureArr,
            popupVisible : featureArr.length > 0 ? true : false
        })
    }   

    onZoomHandler(){
        const map = this.state.map;
        const layers:VectorLayer[] = map.getLayers().array_;
        const zoomLevel = map.getView().getZoom();
        var radius;
        if(zoomLevel > 18){
            radius = 6;
        }else if(zoomLevel > 15){
            radius = 5;
        }else if(zoomLevel > 13){
            radius = 4;
        }else if(zoomLevel > 10){
            radius = 3
        }else{
            radius = 2;
        }      
        // starting at 1 as tile layer does not support setting style
        for(var i = 1; i < layers.length; i++){
            let originalStyle = layers[i].getStyle()['image_'];
            const layerStyle = new Style({
                image :  new Circle({
                     radius: radius,
                     stroke: new Stroke({
                         color: originalStyle["stroke_"]["color_"],
                         width: 1
                     }),
                     fill: new Fill({
                         color: originalStyle["fill_"]["color_"]
                     })
                 })
             })       
            layers[i].setStyle(layerStyle)
        }   
    }

    initMap(){
        var layers = [...this.props.layers]
        var map = new ol.Map({
            target: "NWP_MAP",
            layers: this.state.layers,
            view: new ol.View({
              center: this.props.mapCenter,
              zoom: this.props.initialZoom,
              projection: this.state.projection
            })
        });
        layers.forEach((layer:any)=>{
            map.addLayer(layer)
        })
        // binding actions, (zoom, hover, click, doubleClick)
        map.getView().on('change:resolution', this.onZoomHandler)
        map.on('pointermove', this.hoverHandler.bind(this))
        map.on('click', this.props.onClickHandler.bind(this, map))
        map.on('dblclick', this.props.onDoubleClickHandler.bind(this, map))

        this.setState({
            map : map,
            
        }, () => {
            this.state.map.render();
            this.state.map.updateSize();
        })
    }

    componentDidMount(){
        this.initMap();
    }

    componentWillReceiveProps(props:NetworkPlannerVisualizerMapPropsInterface){
        if(props.layersParents.length > this.props.layersParents.length){
            console.log('more layers nigs', props.layersParents.length, this.props.layersParents.length)
            this.state.map.addLayer(props.layersParents[props.layersParents.length-1])
        }else{
            console.log('something else happened')
        }
        if(props.layerChildren.length > this.props.layerChildren.length){
            console.log('more layers nigs', props.layerChildren.length, this.props.layerChildren.length)
            this.state.map.addLayer(props.layerChildren[props.layerChildren.length-1])
        }else if(props.layerChildren.length == this.props.layerChildren.length){
            console.log('something else happened')
        }
    }

    render() {
        return (
            <div id="NWP_MAP" className={"nwpMap"}>
                <div className={"MapPopUpCont-hack"}><VisualizerMapPopup popupVisible={this.state.popupVisible} focusedFeatures={this.state.focusedFeatures}/></div>
            </div>
        )
    }
}

export default NetworkPlannerVisualizerMap;
