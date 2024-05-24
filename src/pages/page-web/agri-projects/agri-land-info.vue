
<template>
  <div class="agri-land-info-container">
    <div class="left-wrap">
      <div class="search-wrap">
        <div class="search-item">
          <div>地块编号：</div>
          <a-input v-model:value="searchLandNum" placeholder="请输入地块编号" />
        </div>
        <div class="search-item">
          <div>地块名称：</div>
          <a-input v-model:value="searchLandNum" placeholder="请输入地块名称" />
        </div>
        <a-button type="primary">搜索</a-button>
        <a-button>重置</a-button>
      </div>
      <div class="table-btn-wrap">
        <a-button type="primary">删除</a-button>
        <a-button @click="handleAddBtnClick">新增</a-button>
        <a-button>上传底图</a-button>
      </div>
      <div class="land-info-table-wrap">
        <a-table
          :columns="columns"
          :data-source="data.landInfoData"
          :pagination="paginationProp"
          @change="refreshData"
          row-key="device_sn"
          :row-selection="rowSelection"
          :scroll="{ x: '100%', y: 600 }"
          :loading="loading"
        >
          <!-- 操作 -->
          <template #action="{ record }">
            <div class="editable-row-operations">
              <div @click="handleLook(record)">查看</div>
            </div>
          </template>
        </a-table>
      </div>
      <!-- 新增地块弹框 -->
      <AddLandFormModal
        v-model:visible="addFormVisible"
        v-model:landInfoStage="landInfoStage"
        @handleVisibleChange="onAddFormVisibleChange"
        @handleClickNextBtn="onClickNextBtn"
      ></AddLandFormModal>
    </div>
    <div class="right-wrap">
      <el-amap :center="center" :zoom="zoom" @init="init">
        <el-amap-layer-satellite :visible="visible" />
        <!-- <el-amap-geojson
          :geo="testLandDataGcj02"
          :polygon-options="polygonOptions1"
          :visible="true"
          :draggable="false"
        /> -->
        <!-- <el-amap-geojson
          :geo="testLandData"
          :polygon-options="polygonOptions1"
          :visible="true"
          :draggable="false"
        /> -->
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
import { Pagination, message } from 'ant-design-vue'
import { ColumnProps, TableState } from 'ant-design-vue/lib/table/interface'
import { onMounted, reactive, ref, watch } from 'vue'
import { ELocalStorageKey, EDeviceTypeName } from '/@/types'
import { Device } from '/@/types/device'
import { getLandList } from '/@/api/land'
import { LandListParams } from '/@/types/land'
import { isNull } from 'lodash'

const userId = localStorage.getItem(ELocalStorageKey.UserId)!

const rowSelection = {
  onChange: (selectedRowKeys: (string | number)[], selectedRows: []) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows
    )
  },
  onSelect: (record: any, selected: boolean, selectedRows: []) => {
    console.log(record, selected, selectedRows)
  },
  onSelectAll: (selected: boolean, selectedRows: [], changeRows: []) => {
    console.log(selected, selectedRows, changeRows)
  },
}
type Pagination = TableState['pagination'];
const columns: ColumnProps[] = [
  { title: '编号', dataIndex: 'field_no', width: 100, className: 'titleStyle' },
  { title: '名称', dataIndex: 'name', width: 100, className: 'titleStyle' },
  {
    title: '所在地区',
    dataIndex: 'region',
    width: 100,
    className: 'titleStyle',
  },
  {
    title: '面积（m²）',
    dataIndex: 'area',
    width: 100,
    className: 'titleStyle',
  },
  { title: '经度', dataIndex: 'longitude', width: 80, className: 'titleStyle' },
  {
    title: '纬度',
    dataIndex: 'latitude',
    width: 80,
    className: 'titleStyle',
  },
  {
    title: '所属单位',
    dataIndex: 'company',
    width: 100,
    className: 'titleStyle',
  },
  {
    title: '负责人',
    dataIndex: 'resPersion',
    width: 80,
    className: 'titleStyle',
  },
  {
    title: '对应文件',
    dataIndex: 'fileId',
    width: 100,
    className: 'titleStyle',
  },
  {
    title: '操作',
    dataIndex: 'actions',
    width: 100,
    className: 'titleStyle',
    slots: { customRender: 'action' },
  },
  {
    // 到时候路由跳转传过去地块编号就行
    title: '小区情况',
    dataIndex: 'look_area',
    width: 100,
    className: 'titleStyle',
    slots: { customRender: 'look_area' },
  },
]

// 新增地块弹框
const addFormVisible = ref(false)
// 地图勾画在第几步
const landInfoStage = ref(1)
const landFeature = reactive({
  data: null
})

const zoom = ref(12)
// const center = ref([121.59996, 31.197646])
// const center = ref([116.209477587705379, 40.075038208603736])
const center = ref([116.29098549, 39.94893301])
let map: any = null
const visible = ref(true)
const type = ref('polygon')
const created = ref(false)
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

const searchLandNum = ref('')
const searchLandName = ref('')
const loading = ref(false)
const data = reactive<any>({
  landInfoData: null,
})
const paginationProp = reactive({
  pageSizeOptions: ['20', '50', '100'],
  showQuickJumper: true,
  showSizeChanger: true,
  pageSize: 50,
  current: 1,
  total: 0,
})

const handleAddBtnClick = () => {
  addFormVisible.value = true
  landInfoStage.value = 1
  created.value = true
}

// 新增弹框显隐回调函数
const onAddFormVisibleChange = (visible: boolean) => {
  addFormVisible.value = visible
}
// 点击下一步
const onClickNextBtn = () => {
  /** 当没有地块信息，弹框提示，请先勾画地块
  * 当地块已经勾画好，有landFeature.data的信息，调用工具函数判断地块有没有交叉，有交叉，弹框提示让客户重新画
  * 有地块勾画，地块勾画没交叉，把landStage变为2
  *  */
  if (isNull(landFeature.data)) {
    message.warning('请先在地图上勾画地块')
  } else {
    landInfoStage.value = 2
  }
}

// 获取地块信息列表信息
function getLandInfoList (params: LandListParams) {
  loading.value = true
  getLandList(userId, params).then((res) => {
    if (res.code !== 0) {
      return
    }
    const resData: any[] = res.data.list
    console.log('789', resData)
    data.landInfoData = resData
    paginationProp.total = res.data.pagination.total
    paginationProp.current = res.data.pagination.page
    paginationProp.pageSize = res.data.pagination.page_size
    loading.value = false
  })
}

function refreshData (page: Pagination) {
  paginationProp.current = page?.current!
  paginationProp.pageSize = page?.pageSize!
  const landParams = {
    page: page?.current!,
    page_size: page?.pageSize!,
  }
  getLandInfoList(landParams)
}

const handleLook = (record: any) => {}

const init = (e: any) => {
  map = e
  console.log('map init: ', map)
}

const draw = (e: number[][], target: any) => {
  console.log('绘制完成 : ', e, target)
  const testFeature = {
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
  testFeature.geometry.coordinates = [e]
  landFeature.data = testFeature
  // testGeojsonData.features.push(sampleFeature)
}

onMounted(() => {
  const landParams = {
    page: 1,
    page_size: 20,
  }
  getLandInfoList(landParams)
})

</script>
<style scoped>
.agri-land-info-container {
  display: flex;
  width: 100%;
  height: 100%;
}
.left-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
}
.right-wrap {
  width: 50%;
  height: 100%;
}
</style>
