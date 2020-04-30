import {Fill, Stroke, Circle, Style} from 'ol/style'; 
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';

export const planningColors = [
    {
        parent: {
            fillColor: "blue",
            borderColor: "blue",
        },
        child: {
            fillColor: "lightblue",
            borderColor: "black",
        }
    },
    {
        parent: {
            fillColor: "red",
            borderColor: "red",
        },
        child: {
            fillColor: "pink",
            borderColor: "black",
        }
    },
    {
        parent: {
            fillColor: "green",
            borderColor: "green",
        },
        child: {
            fillColor: "lightgreen",
            borderColor: "black",
        }
    },
    {
        parent: {
            fillColor: "rebeccapurple",
            borderColor: "rebeccapurple",
        },
        child: {
            fillColor: "mediumpurple",
            borderColor: "black",
        }
    },
    {
        parent: {
            fillColor: "orangered",
            borderColor: "orangered",
        },
        child: {
            fillColor: "lightsalmon",
            borderColor: "black",
            
        }
    },
    {
        parent: {
            fillColor: "orangered",
            borderColor: "orangered",
        },
        child: {
            fillColor: "lightsalmon",
            borderColor: "black",
        }
    }
]

export function getCentroid(coord:any[]) {
    var center = coord.reduce(
        function(x, y) {
            return [
                x[0] + y[0] / coord.length,
                x[1] + y[1] / coord.length
            ];
        },
        [0, 0]
    );
    return center;
};

export function createParentLayer(device:NetworkPlannerVisualizerParentFeature,colorIndex:number):VectorLayer{
    // Style Creation
    const style = new Style({
        image : new Circle({
            radius : 8,
            stroke : new Stroke({
                color : planningColors[colorIndex].parent.borderColor,
                width : 1,
            }),
            fill : new Fill({
                color : planningColors[colorIndex].parent.fillColor,
            })
        })
    })
    // Setting Parent device point location
    const point = new Point([device.location[1], device.location[0]])
    // Feature Creation
    const feature = new Feature({
        geometry : point,
        properties : {
            name : device.name,
            id : device.id,
            description : device.name,
            deviceType : device.deviceType,
            currentChildren: device.currentChildren,
            isParent : device.isParent
        },
        name:  device.name,
    })
    // Source Creation
    const source = new VectorSource();
    // Layer Creation
    const layer = new VectorLayer({
        source : source,
        style : style
    });
    layer.setProperties({
        parentDeviceId:device.name
    })
    source.addFeature(feature);    
    return layer;
}

export function createChildLayer(devices:NetworkPlannerVisualizerChildFeature[], colorIndex:number, dummyId? :string):VectorLayer{
    // Style Creation
    const style = new Style({
        image : new Circle({
            radius : 8,
            stroke : new Stroke({
                color : planningColors[colorIndex].child.borderColor,
                width : 1,
            }),
            fill : new Fill({
                color : planningColors[colorIndex].child.fillColor,
            })
        })
    })
    // Source Creation
    const source = new VectorSource();
    // Layer Creation
    const layer = new VectorLayer({
        source : source,
        style : style,
    });
    if(dummyId !== undefined){
        layer.setProperties({
            parentDeviceId: dummyId
        })    
    }else{
        layer.setProperties({
            parentDeviceId:devices[0].originParent
        })    
    }
    
    // Setting Parent device point location
    devices.forEach((device:NetworkPlannerVisualizerChildFeature )=>{
        const point = new Point([device.location[1], device.location[0]])
        // Feature Creation
        const feature = new Feature({
            geometry : point,
            properties : {
                name : device.name,
                id : device.id,
                description : device.name,
                deviceType : device.deviceType,
                isParent : device.isParent,
                originParent : device.originParent,
                currentParent : device.currentParent
            },
            name:  device.name,
        })
        source.addFeature(feature)
    })
    
    
    
    return layer;
}

