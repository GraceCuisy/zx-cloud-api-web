
<template>
  <div class="test-page-container">
    <div class="left-wrap">
      左侧表格
      <button @click="handleAddLand">新增</button>
    </div>
    <div class="right-wrap">
      <el-amap :center="center" :zoom="zoom" @init="init">
        <!-- <el-amap-layer-satellite :visible="visible" /> -->
        <!-- url必须是在线图片地址，用本地图片显示不出来 -->
        <el-amap-layer-image
          url="https://amappc.cn-hangzhou.oss-pub.aliyun-inc.com/lbs/static/img/dongwuyuan.jpg"
          :bounds="imgBounds"
          :visible="true"
        />
        <el-amap-geojson
          :geo="testGeojsonData"
          :polygon-options="polygonOptions"
          :visible="true"
          :draggable="false"
        />
        <el-amap-mouse-tool
          v-if="created"
          :type="type"
          :auto-clear="false"
          @draw="draw"
        />
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
  ElAmapLayerImage
} from '@vuemap/vue-amap'
import testImg from '/@/assets/imgs/testImg2.jpg'

const zoom = ref(12)
// const center = ref([121.59996, 31.197646])
const center = ref([116.209477587705379, 40.075038208603736])
let map: any = null
const visible = ref(true)
const type = ref('polygon')
const created = ref(true)
const polygonOptions = ref({
  strokeColor: 'red',
  fillColor: 'blue',
})
// const imgBounds = ref([116.201, 40.036, 116.207, 40.04])
const imgBounds = ref([116.157, 40.078, 116.241, 40.16])

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

onMounted(() => {})
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
