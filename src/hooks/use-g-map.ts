import AMapLoader from '@amap/amap-jsapi-loader'
import { App, reactive } from 'vue'
import { AMapConfig } from '/@/constants/index'

interface State {
  aMap: any;
  map: any;
  mouseTool: any;
}

export function useGMapManage () {
  const state:State = reactive({
    aMap: null, // Map类
    map: null, // 地图对象
    mouseTool: null,
  })

  async function initMap (container: string, app:App) {
    AMapLoader.load({
      ...AMapConfig
    }).then((AMap) => {
      state.aMap = AMap
      state.map = new AMap.Map(container, {
        center: [113.943225499, 22.577673716],
        zoom: 20
      })
      state.mouseTool = new AMap.MouseTool(state.map)
      // 挂在到全局
      app.config.globalProperties.$aMap = state.aMap
      app.config.globalProperties.$map = state.map
      app.config.globalProperties.$mouseTool = state.mouseTool

    //    // 农田MVT图层
    // const mvtLayer = new AMap.MapboxVectorTileLayer({
    //   zIndex: 9,
    //   opacity: 0.3,
    //   url: 'http://192.168.22.120:8080/geoserver/nyc_roads/wms?service=WMS&version=1.1.0&request=GetMap&layers=nyc_roads%3Anyc_buildings&bbox=983797.5%2C207443.0%2C991899.0625%2C218850.828125&width=545&height=768&srs=EPSG%3A2908&styles=&format=geojson',
    //   dataZooms: [1, 22],
    //   tileSize: 256,
    //   styles: {
    //     polygon: {
    //       borderColor: 'red',
    //       borderWidth: 5,
    //       // color: function(props) {
    //       //   const num = props['作物生长指数'];
    //       //   const colors = [
    //       //     'rgb(249,243,183)',
    //       //     'rgb(249,243,123)',
    //       //     'rgb(238 243 77)',
    //       //     'rgb(226,231,0)',
    //       //     'rgb(226,173,12)',
    //       //     'rgb(226,96,21)',
    //       //     'rgb(226,49,24)',
    //       //     'rgb(160,19,24)',
    //       //     'rgb(117,16,60)',
    //       //     'rgb(72,9,109)',
    //       //   ];
    //       //   return colors[num - 1];
    //       // },
    //     },
    //     line: {
    //       visible: false
    //     },
    //     point: {
    //       visible: false
    //     }
    //   },
    // });
    // state.map.add(mvtLayer);
    }).catch(e => {
      console.log(e)
    })
  }

  function globalPropertiesConfig (app:App) {
    initMap('g-container', app)
  }

  return {
    globalPropertiesConfig,
  }
}
