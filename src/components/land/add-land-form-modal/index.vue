
<template>
  <div class="add-land-form-wrap">
    <div v-if="modalVisible" class="add-land-modal">
      <div class="step-wrap" v-if="modalLandInfoStage === 1">
        <div class="top-btn-wrap">
          <a-button>退出编辑</a-button>
          <a-button type="primary" @click="handleClickNext">下一步</a-button>
        </div>
        <div class="step-content">
          <img
            class="step-item"
            v-for="(img, index) in stepArr"
            :key="index"
            :src="img"
          />
        </div>
      </div>
      <div class="form-wrap" v-if="modalLandInfoStage === 2">
        <div class="form-btn-wrap">
          <div>地块属性信息</div>
          <a-button>保存</a-button>
          <a-button type="primary">退出</a-button>
        </div>
        <a-form
          :model="formState"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-item label="名称">
            <a-input v-model:value="formState.name" />
          </a-form-item>
          <a-form-item label="所在地区">
            <a-input v-model:value="formState.desc" />
          </a-form-item>
          <a-form-item label="面积（m²）">
            <a-input v-model:value="formState.name" />
          </a-form-item>
          <!-- <a-form-item label="经度">
            <a-input v-model:value="formState.desc" />
          </a-form-item>
          <a-form-item label="纬度">
            <a-input v-model:value="formState.desc" />
          </a-form-item> -->
          <a-form-item label="所属单位">
            <a-input v-model:value="formState.name" />
          </a-form-item>
          <a-form-item label="负责人">
            <a-input v-model:value="formState.name" />
          </a-form-item>
          <a-form-item label="对应文件">
            <a-input v-model:value="formState.name" />
          </a-form-item>
          <a-form-item label="备注">
            <a-textarea v-model:value="formState.name" />
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {
  UnwrapRef,
  onMounted,
  reactive,
  ref,
  toRaw,
  defineProps,
  PropType,
  defineEmits,
  computed,
  watch,
  toRefs,
} from 'vue'
import { ELocalStorageKey, EDeviceTypeName } from '/@/types'
import { FormState } from '/@/types/land'
import step1 from '/@/components/land/add-land-form-modal/imgs/step1.png'
import step2 from '/@/components/land/add-land-form-modal/imgs/step2.png'
import step3 from '/@/components/land/add-land-form-modal/imgs/step3.png'
import step4 from '/@/components/land/add-land-form-modal/imgs/step4.png'
import { GeoType } from '../../../types/mapLayer'

// type TFunction = (visible:Boolean)=>void
// type SFunction = ()=>void

const stepArr = [step1, step2, step3, step4]
const props = defineProps({
  visible: Boolean,
  landInfoStage: Number,
  // handleVisibleChange: Function as PropType<TFunction>,
  // handleSubmit: Function as PropType<SFunction>,
})
const emit = defineEmits([
  'handleVisibleChange',
  'handleSubmit',
  // 'handleLandStageChange',
  'handleClickNextBtn',
])

const userId = localStorage.getItem(ELocalStorageKey.UserId)!

const labelCol = { span: 8 }
const wrapperCol = { span: 16 }
const formState: UnwrapRef<FormState> = reactive({
  name: '',
  region: undefined,
  date1: undefined,
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})
// const visible = ref<boolean>(false)

const modalVisible = computed({
  get: () => props.visible,
  set: (newVal) => emit('handleVisibleChange', newVal),
})

const modalLandInfoStage = computed({
  get: () => props.landInfoStage,
  // set: (newVal) => emit('handleLandStageChange', newVal),
  set: (newVal) => {},
})

const handleClickNext = () => {
  emit('handleClickNextBtn')
}

const handleOk = (e: MouseEvent) => {
  console.log(e)
  modalVisible.value = false
}

const onSubmit = () => {
  console.log('submit!', toRaw(formState))
}

// 获取地块信息列表信息
// function getLandInfoList (params: LandListParams) {
//   loading.value = true
//   getLandList(userId, params).then((res) => {
//     if (res.code !== 0) {
//       return
//     }
//     const resData: any[] = res.data.list
//     console.log('789', resData)
//     data.landInfoData = resData
//     paginationProp.total = res.data.pagination.total
//     paginationProp.current = res.data.pagination.page
//     paginationProp.pageSize = res.data.pagination.page_size
//     loading.value = false
//   })
// }

onMounted(() => {})

watch(props, (newProps) => {
  modalLandInfoStage.value = newProps.landInfoStage
})
</script>
<style scoped>
.add-land-form-wrap {
  display: flex;
  width: 100%;
  height: 100%;
}
.add-land-modal {
  position: absolute;
  left: 8px;
  top: 30px;
  width: 326px;
  max-height: 96%;
  overflow-y: scroll;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: rgb(15 31 82 / 25%) 0px 1px 6px 0px;
}
.step-wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.top-btn-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 0 10px;
}
.step-content {
  width: 100%;
  flex: 0 0 1;
}
.step-item {
  width: 100%;
  height: 138px;
}
.form-wrap {
  /* padding:20px 0; */
}
.form-btn-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 0 10px;
}
</style>
