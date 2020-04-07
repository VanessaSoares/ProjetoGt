import React , {Component} from 'react'
import L from "leaflet"
import axios from 'axios';
import API_DOMAIN  from '../config/api'

class Map extends Component {
    constructor() {
        super();
        this.state = {
            myMap: null,
            marker: null,
        }
    }

    checkUf(e) {
        const lng = e.latlng.lng;
        const lat = e.latlng.lat;
        var bbox = (lng - 0.1) + ',' + (lat - 0.1) + ',' + (lng + 0.1) + ',' + (lat + 0.1);
        axios.get('http://sistemas.gt4w.com.br/geoserver/processo_seletivo/wms?REQUEST=GetFeatureInfo&QUERY_LAYERS=processo_seletivo%3Aufs_brasil&LAYERS=processo_seletivo%3Aufs_brasil&FEATURE_COUNT=50&X=50&Y=50&WIDTH=101&HEIGHT=101&info_format=application/json&BBOX=' + bbox)
        .then((response) => {
            if(response.data.features.length > 0) {
                axios.get(API_DOMAIN + '/pessoas/byUf/' + response.data.features[0].properties.CD_GEOCODU).then(
                    (responseApi) => {
                        if (this.state.marker)
                            this.state.myMap.removeLayer(this.state.marker)
    
                        const curState = this.state;
                        curState.marker = L.marker(e.latlng).addTo(this.state.myMap);
                        curState.marker.bindTooltip('Total pessoas cadastradas em ' + response.data.features[0].properties.NM_ESTADO + ": " + responseApi.data.length).openTooltip();
                        this.setState(curState);
                    }
                )
            }
        })
    }

    componentDidMount() {
        const map = L.map('mapid').setView([-12, -52], 3.5);
        const curState = this.state;
        curState.myMap = map;
        this.setState(curState);
        L.tileLayer.wms('http://sistemas.gt4w.com.br/geoserver/processo_seletivo/wms?', {
            layers: 'processo_seletivo:ufs_brasil'
        }).addTo(this.state.myMap);
        this.state.myMap.on('click', this.checkUf.bind(this))
    }
    
    render() {
        return(<div id="mapid" style={{ height: '600px' }}></div>)
    }
}

export default Map