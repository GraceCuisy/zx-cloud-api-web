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
  const testLandData = reactive({
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        id: '高德地图矢量图层.1',
        geometry: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [116.28458013, 39.94265389],
                [116.28456683, 39.94271927],
                [116.28474416, 39.94274587],
                [116.28476078, 39.9426827],
                [116.28458013, 39.94265389],
              ],
            ],
          ],
        },
        geometry_name: 'the_geom',
        properties: { id: 1, name: '1#平台' },
      },
      {
        type: 'Feature',
        id: '高德地图矢量图层.2',
        geometry: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [116.2845624, 39.94273257],
                [116.28449258, 39.94300853],
                [116.2846699, 39.94303624],
                [116.28473861, 39.94276028],
                [116.2845624, 39.94273257],
              ],
            ],
          ],
        },
        geometry_name: 'the_geom',
        properties: { id: 2, name: '2#平台' },
      },
      {
        type: 'Feature',
        id: '高德地图矢量图层.3',
        geometry: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [116.28451474, 39.94251646],
                [116.28439838, 39.94299967],
                [116.28448039, 39.94301075],
                [116.28459786, 39.94253198],
                [116.28451474, 39.94251646],
              ],
            ],
          ],
        },
        geometry_name: 'the_geom',
        properties: { id: 3, name: '3#平台' },
      },
      {
        type: 'Feature',
        id: '高德地图矢量图层.4',
        geometry: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [116.28442054, 39.94250095],
                [116.28430528, 39.94298083],
                [116.28438729, 39.94299523],
                [116.28450699, 39.94251868],
                [116.28442054, 39.94250095],
              ],
            ],
          ],
        },
        geometry_name: 'the_geom',
        properties: { id: 4, name: '4#平台' },
      },
      {
        type: 'Feature',
        id: '高德地图矢量图层.5',
        geometry: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [116.28442719, 39.942481],
                [116.28458456, 39.94251203],
                [116.28459565, 39.94245329],
                [116.28443938, 39.94242891],
                [116.28442719, 39.942481],
              ],
            ],
          ],
        },
        geometry_name: 'the_geom',
        properties: { id: 5, name: '旱棚' },
      },
      {
        type: 'Feature',
        id: '高德地图矢量图层.6',
        geometry: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [116.28444271, 39.94241339],
                [116.28457127, 39.94243556],
                [116.28458235, 39.94238568],
                [116.28445268, 39.9423613],
                [116.28444271, 39.94241339],
              ],
            ],
          ],
        },
        geometry_name: 'the_geom',
        properties: { id: 6, name: '小温室' },
      },
    ],
    totalFeatures: 6,
    numberMatched: 6,
    numberReturned: 6,
    timeStamp: '2024-05-20T10:21:01.001Z',
    crs: { type: 'name', properties: { name: 'urn:ogc:def:crs:EPSG::3857' } },
  })

  function addGeoJson () {
    // const { data } = await axios('https://a.amap.com/jsapi_demos/static/geojson/chongqing.json')
    // console.log(666, data)
    state.aMap.plugin('AMap.GeoJSON', () => {
      const geojson = new state.aMap.GeoJSON({
        // geoJSON: `${import.meta.env.BASE_URL}/data/agri_land_2000.geojson`,
        geoJSON: testLandData,
        // geoJSON: data,
        // 还可以自定义getMarker和getPolyline
        getPolygon: (geojson, lnglats) => {
          return new state.aMap.Polygon({
            path: lnglats,
            fillOpacity: 1, //
            strokeColor: 'blue',
            strokeWeight: 1,
            // fillColor: 'rgba(151 ,255 ,255,1)',
            fillColor: 'red'
          })
        },
        // // 还可以自定义getMarker和getPolyline
        // getPolygon: function (geojson, lnglats) {
        //   // 计算面积
        //   const area = state.aMap.GeometryUtil.ringArea(lnglats[0])

        //   return new state.aMap.Polygon({
        //     path: lnglats,
        //     fillOpacity: 1 - Math.sqrt(area / 8000000000), // 面积越大透明度越高
        //     strokeColor: 'white',
        //     fillColor: 'red'
        //   })
        // }
      })
      state.map.add(geojson)
      // geojson.setMap()
      // state.map.panTo([116.1268334960938, 39.8554994773864], 100)
    })
  }

  async function initMap (container: string, app:App) {
    AMapLoader.load({
      ...AMapConfig
    }).then((AMap) => {
      state.aMap = AMap
      state.map = new AMap.Map(container, {
        // center: [113.943225499, 22.577673716],
        center: [116.29098549, 39.94893301],
        zoom: 20
      })
      state.mouseTool = new AMap.MouseTool(state.map)
      addGeoJson()
      // 挂在到全局
      app.config.globalProperties.$aMap = state.aMap
      app.config.globalProperties.$map = state.map
      app.config.globalProperties.$mouseTool = state.mouseTool
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
