import 'ol/ol.css';

import Overlay from 'ol/Overlay';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import XYZ from 'ol/source/XYZ';
import {toLonLat} from 'ol/proj';
import {toStringHDMS} from 'ol/coordinate';
import {getLayerByName} from './customFunction';

const map=$('#map').data('map');


/**
 * Elements that make up the popup.
 */
const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');

/**
 * Create an overlay to anchor the popup to the map.
 */
const overlay = new Overlay({
  element: container,
  autoPan: true,
  autoPanAnimation: {
    duration: 250,
  },
});

/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};

const key = 'Get your own API key at https://www.maptiler.com/cloud/';
const attributions =
  '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
  '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

/**
 * Create the map.
 */
map.addOverlay(overlay);

/**
 * Add a click handler to the map to render the popup.
 */
map.on('singleclick', function (evt) {
  const coordinate = evt.coordinate;
  const hdms = toStringHDMS(toLonLat(coordinate));

//   getting layer by name
const parcelsLayer= getLayerByName('Parcels');
const parcelSource=parcelsLayer.getSource();
const view=map.getView();
const resolution=view.getResolution();
const projection=view.getProjection();


const parcelUrl = parcelSource.getFeatureInfoUrl(coordinate,resolution,projection,
    {'INFO_FORMAT':'application/json'});

    if(parcelUrl){
        $.ajax({
            url:parcelUrl,
            method:'GET',
            success:function(result){
                console.log(result);
            }
        })
    }

  content.innerHTML = '<p>You clicked here:</p><code>' + hdms + '</code>';
  overlay.setPosition(coordinate);
});
