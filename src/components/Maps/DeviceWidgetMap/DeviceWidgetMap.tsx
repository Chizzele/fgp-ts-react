import React, { Component } from 'react'
import { DeviceWidgetMapPropsInterface, DeviceWidgetMapStateInterface } from './DeviceWidgetMapInterfaces';
import './DeviceWidgetMap.css'
import * as ol from 'ol'
// import * as layer from 'ol/layer'
// import * as source from 'ol/source'
// import * as proj from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
// import Feature from 'ol/Feature';
// import Polygon from 'ol/geom/Polygon';
// import Point from 'ol/geom/Point';
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM';
import {Fill, Stroke, Circle, Style} from 'ol/style'; 
import {MapPopup} from './MapPopup';

export class DeviceWidgetMap extends Component<DeviceWidgetMapPropsInterface, DeviceWidgetMapStateInterface> {
    constructor(props:DeviceWidgetMapPropsInterface){
        super(props);
        // baseStyle is the device's style
        const baseStyle = new Style({
            image : new Circle({
                radius : this.props.featureStyles !== undefined ? this.props.featureStyles[0].initRadius : 2,
                stroke: new Stroke({
                    color : this.props.featureStyles !== undefined ? this.props.featureStyles[0].strokeColor : 'black',
                    width : this.props.featureStyles !== undefined ? this.props.featureStyles[0].strokeWidth : 1,
                }),
                fill : new Fill({
                    color : this.props.featureStyles !== undefined ? this.props.featureStyles[0].fillColor : 'red',
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
        const defaultMapCenter = [0,0];
        const defaultZoomLevel = 8;
        this.state = {
            map : null,
            layers : this.props.layers !== undefined ? baseLayers.concat(this.props.layers) : baseLayers,
            mapCenter : this.props.mapCenter ? this.props.mapCenter : defaultMapCenter,
            zoomLevel : this.props.zoomLevel ? this.props.zoomLevel : defaultZoomLevel,
            projection : this.props.projection !== undefined ? this.props.projection : "EPSG:4326",
            focusedFeatures : [],
            highlightedFeatures : [],
            popupVisible : false
        };

        this.styleHandlerZoom = this.styleHandlerZoom.bind(this);
        this.hoverHandler = this.hoverHandler.bind(this);
    }
    componentDidMount(){
        this.buildMap();

        // window.addEventListener("resize", this.handleResize);

    }

    // handleResize(e:any){
    //     const windowSize = window.innerWidth;
    //     console.log(e, windowSize)
    // }

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

    styleHandlerZoom(){
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

    triggerResize(){
        this.state.map ? this.state.map.updateSize() : null;
    }

    buildMap(){
        var map = new ol.Map({
            target: this.props.mapId,
            layers: this.state.layers,
            view: new ol.View({
              center: this.state.mapCenter,
              zoom: this.state.zoomLevel,
              projection: this.state.projection
            })
        });
        map.getView().on('change:resolution', this.styleHandlerZoom.bind(this))
        if(this.props.onClickCallBack !== undefined){
            console.log('its here')
            map.on('click', this.props.onClickCallBack.bind(this))
        }
        if(this.props.onDoubleClickCallBack !== undefined){
            console.log('its there')
            map.on('dblclick', this.props.onDoubleClickCallBack.bind(this))
        }
        map.on('pointermove', this.hoverHandler.bind(this))
          this.setState({
              map : map
          }, () => {
              this.state.map.render();
              this.state.map.updateSize();
              this.styleHandlerZoom();
            }) 
          
    }

    componentWillReceiveProps(prevProps:any){
        this.props.triggerResize !== prevProps.triggerResize ? this.state.map.updateSize() : null;
    }

    render() {
        return (
            <div id={this.props.mapId} className={"DeviceWidgetMap-cont"}>
                <div className={"MapPopUpCont-hack"}><MapPopup popupVisible={this.state.popupVisible} focusedFeatures={this.state.focusedFeatures}/></div>
            </div>
        )
    }
}

export default DeviceWidgetMap
