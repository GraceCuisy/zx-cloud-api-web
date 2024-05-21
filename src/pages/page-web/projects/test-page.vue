
<template>
  <div class="test-page-container">
    <div class="left-wrap">
      左侧表格
      <button @click="handleAddLand">新增</button>
    </div>
    <div class="right-wrap">
      <el-amap :center="center" :zoom="zoom" @init="init">
        <!-- <el-amap-layer-wms
          :visible="true"
          :url="wmsUrl"
          :blend="false"
          :params="{}"
        /> -->
        <!-- <el-amap-layer-satellite :visible="visible" /> -->
        <!-- url必须是在线图片地址，用本地图片显示不出来 -->
        <el-amap-layer-image
          url="https://amappc.cn-hangzhou.oss-pub.aliyun-inc.com/lbs/static/img/dongwuyuan.jpg"
          :bounds="imgBounds"
          :visible="true"
        />
        <!-- <el-amap-geojson
          :geo="testLandDataGcj02"
          :polygon-options="polygonOptions1"
          :visible="true"
          :draggable="false"
        /> -->
        <el-amap-geojson
          :geo="testLandData"
          :polygon-options="polygonOptions1"
          :visible="true"
          :draggable="false"
        />
        <!-- <el-amap-geojson
          :geo="testGeojsonData"
          :polygon-options="polygonOptions"
          :visible="true"
          :draggable="false"
        /> -->
        <!-- <el-amap-mouse-tool
          v-if="created"
          :type="type"
          :auto-clear="false"
          @draw="draw"
        /> -->
      </el-amap>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { TableState } from 'ant-design-vue/lib/table/interface'
import { onMounted, reactive, Ref, ref, UnwrapRef } from 'vue'
import { IPage } from '/@/api/http/type'
import { ELocalStorageKey } from '/@/types'
import {
  ElAmap,
  ElAmapLayerSatellite,
  ElAmapMouseTool,
  ElAmapLayerImage,
} from '@vuemap/vue-amap'
import testImg from '/@/assets/imgs/testImg2.jpg'
import { wgs84togcj02 } from '/@/vendors/coordtransform'
import { GeojsonCoordinate } from '/@/types/map'
// const testLandData = require('/@/assets/data/test_land_data.json.json')
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
const testLandDataGcj02 = reactive({
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
              [116.29063341283336, 39.94389358806295],
              [116.29062010315656, 39.94395895425674],
              [116.29079767479531, 39.943985774385325],
              [116.29081430931588, 39.94392262245981],
              [116.29063341283336, 39.94389358806295],
            ],
          ],
        ],
      },
      geometry_name: 'the_geom',
      properties: {
        id: 1,
        name: '1#平台',
      },
    },
    {
      type: 'Feature',
      id: '高德地图矢量图层.2',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [116.29061566887762, 39.9439722493231],
              [116.29054578981535, 39.94424813427019],
              [116.29072335106108, 39.944276064044686],
              [116.29079211911503, 39.94400017808631],
              [116.29061566887762, 39.9439722493231],
            ],
          ],
        ],
      },
      geometry_name: 'the_geom',
      properties: {
        id: 2,
        name: '2#平台',
      },
    },
    {
      type: 'Feature',
      id: '高德地图矢量图层.3',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [116.29056791809096, 39.94375607203628],
              [116.29045146289128, 39.94423915812379],
              [116.2905335837908, 39.94425033935899],
              [116.29065115140959, 39.943771695097084],
              [116.29056791809096, 39.94375607203628],
            ],
          ],
        ],
      },
      geometry_name: 'the_geom',
      properties: {
        id: 3,
        name: '3#平台',
      },
    },
    {
      type: 'Feature',
      id: '高德地图矢量图层.4',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [116.29047359025596, 39.94374044556468],
              [116.29035823653669, 39.94422020319007],
              [116.29044035754815, 39.944234704332565],
              [116.29056015799654, 39.94375828258279],
              [116.29047359025596, 39.94374044556468],
            ],
          ],
        ],
      },
      geometry_name: 'the_geom',
      properties: {
        id: 4,
        name: '4#平台',
      },
    },
    {
      type: 'Feature',
      id: '高德地图矢量图层.5',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [116.29048024664414, 39.943720502943634],
              [116.29063783108066, 39.94375172789997],
              [116.29064892862996, 39.943692999249386],
              [116.29049244642303, 39.94366842585754],
              [116.29048024664414, 39.943720502943634],
            ],
          ],
        ],
      },
      geometry_name: 'the_geom',
      properties: {
        id: 5,
        name: '旱棚',
      },
    },
    {
      type: 'Feature',
      id: '高德地图矢量图层.6',
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [116.29049577893446, 39.943652909334844],
              [116.29062451372269, 39.94367523847838],
              [116.29063560235784, 39.94362537016241],
              [116.29050575575498, 39.94360082952467],
              [116.29049577893446, 39.943652909334844],
            ],
          ],
        ],
      },
      geometry_name: 'the_geom',
      properties: {
        id: 6,
        name: '小温室',
      },
    },
  ],
  totalFeatures: 4,
  numberMatched: 4,
  numberReturned: 4,
  timeStamp: '2024-05-20T06:26:29.952Z',
  // crs: {
  //   type: 'name',
  //   properties: {
  //     // name: 'urn:ogc:def:crs:EPSG::4326',
  //   },
  // },
})

const zoom = ref(12)
// const center = ref([121.59996, 31.197646])
// const center = ref([116.209477587705379, 40.075038208603736])
const center = ref([116.29098549, 39.94893301])
let map: any = null
const visible = ref(true)
const type = ref('polygon')
const created = ref(true)
const polygonOptions = ref({
  strokeColor: 'red',
  fillColor: 'blue',
})
const polygonOptions1 = ref({
  strokeColor: 'green',
  fillColor: 'yellow',
})
// const imgBounds = ref([116.201, 40.036, 116.207, 40.04])
const imgBounds = ref([116.157, 40.078, 116.241, 40.16])

const wmsUrl =
  'http://192.168.30.195:8080/geoserver/gistest/wms?service=WMS&version=1.1.0&request=GetMap&layers=gistest%3A%E7%99%BE%E5%BA%A6%E5%9C%B0%E5%9B%BE%E6%88%AA%E5%9B%BE%E5%88%92%E5%9C%B0%E5%9D%97&bbox=116.29070278470428%2C39.94880769125241%2C116.29116035909607%2C39.94933375607863&width=668&height=768&srs=EPSG%3A4326&styles=&format=application/openlayers'
// const imgBounds = ref([116.1268334960938, 39.85549947738647, 116.3035329208374, 40.26972852706909])

const testGeojsonData = reactive({
  type: 'FeatureCollection',
  name: '测试测试',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [116.226778124563722, 40.044943107351124],
            [116.226768202142154, 40.045160061467328],
            [116.227491872321565, 40.045152528346513],
            [116.227492229656178, 40.044953013481688],
            [116.226778124563722, 40.044943107351124],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [116.20815256094923, 40.074960431862984],
            [116.20815021012325, 40.074962271633403],
            [116.207951334703239, 40.075117920905264],
            [116.207733588183217, 40.075288338282242],
            [116.207950941390251, 40.075307690885559],
            [116.208467537280868, 40.075353685473523],
            [116.2085330068102, 40.075120790003112],
            [116.209312677795793, 40.075196625776954],
            [116.209312043959187, 40.075504484491034],
            [116.209691789106813, 40.075543005102936],
            [116.210106493693445, 40.07558507009017],
            [116.210141909289888, 40.075382146663657],
            [116.209477587705379, 40.075038208603736],
            [116.208681783283183, 40.074680761962661],
            [116.208251773593872, 40.075029088967398],
            [116.20815256094923, 40.074960431862984],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [116.260901683356238, 40.054686834377165],
            [116.259145463622659, 40.054608701027306],
            [116.259015552161202, 40.055152552167918],
            [116.259017836996478, 40.055179383269298],
            [116.260951635119582, 40.055369241415512],
            [116.26108420256493, 40.05534890836956],
            [116.260912574179414, 40.054720435682185],
            [116.260901683356238, 40.054686834377165],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [116.243891535959222, 40.096194851097508],
            [116.243612677336827, 40.096105166562012],
            [116.243498028486869, 40.096322676849915],
            [116.243467062019207, 40.096381427435766],
            [116.241814771551262, 40.095780475486961],
            [116.242363635718505, 40.094820079684297],
            [116.242415662872503, 40.094729044135974],
            [116.242135868036087, 40.094635732908941],
            [116.24208516242085, 40.094725874360414],
            [116.241430471967448, 40.095889714279167],
            [116.2412616847338, 40.096178056624709],
            [116.241224907450544, 40.09623938769937],
            [116.243426012960583, 40.096994359627104],
            [116.243891535959222, 40.096194851097508],
          ],
        ],
      },
    },
  ],
})

onMounted(() => {
  // const testLandDataFeaturesGcj02 = testLandData.features.map((i, index) => {
  //   const coordinates = i.geometry.coordinates[0][0]
  //   coordinates.forEach((coordinate, i, arr) => {
  //     arr[i] = wgs84togcj02(coordinate[0], coordinate[1]) as GeojsonCoordinate
  //   })
  //   i.geometry.coordinates[0][0] = coordinates
  //   return i
  // })
  // console.log('first', testLandDataFeaturesGcj02)
  // // @ts-ignore
  // testLandDataGcj02.features = testLandDataFeaturesGcj02
})
const init = (e: any) => {
  map = e
  console.log('map init: ', map)
}

const handleAddLand = () => {
  console.log('新增地块')
}

const draw = (e: number[][], target: any) => {
  console.log('绘制完成 : ', e, target)
  const sampleFeature = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [116.226778124563722, 40.044943107351124],
          [116.226768202142154, 40.045160061467328],
          [116.227491872321565, 40.045152528346513],
          [116.227492229656178, 40.044953013481688],
          [116.226778124563722, 40.044943107351124],
        ],
      ],
    },
  }
  sampleFeature.geometry.coordinates = [e]
  testGeojsonData.features.push(sampleFeature)
}
</script>
<style scoped>
.test-page-container {
  display: flex;
  width: 100%;
  height: 100%;
}
.left-wrap {
  width: 30%;
  height: 100%;
}
.right-wrap {
  width: 70%;
  height: 100%;
}
</style>
