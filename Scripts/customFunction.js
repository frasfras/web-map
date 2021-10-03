const map=$('#map').data('map');
const mapLayer = map.getLayers();

export function getLayerByName(layerName){
    let layer= null;

    mapLayer.forEach(lyr => {
        if(lyr.get('name')===layerName)
        layer= lyr;
    });
    return layer;
}