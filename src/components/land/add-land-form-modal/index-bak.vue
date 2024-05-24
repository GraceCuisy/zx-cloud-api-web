
<template>
  <div class="add-land-form-wrap">
    <a-modal
      v-model:visible="modalVisible"
      title="新增"
      @ok="handleOk"
      bodyStyle="padding:0px"
      :footer="null"
    >
      <div class="step-wrap" v-if="modalLandInfoStage === 0">
        <div class="top-btn-wrap">
          <a-button>退出编辑</a-button>
          <a-button type="primary">下一步</a-button>
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
      <div class="form-wrap" v-if="modalLandInfoStage === 1">
        <a-form
          :model="formState"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-item label="Activity name">
            <a-input v-model:value="formState.name" />
          </a-form-item>
          <a-form-item label="Activity zone">
            <a-select
              v-model:value="formState.region"
              placeholder="please select your zone"
            >
              <a-select-option value="shanghai">Zone one</a-select-option>
              <a-select-option value="beijing">Zone two</a-select-option>
            </a-select>
          </a-form-item>
          <!-- <a-form-item label="Activity time">
        <a-date-picker
          v-model:value="formState.date1"
          show-time
          type="date"
          placeholder="Pick a date"
          style="width: 100%"
        />
      </a-form-item> -->
          <a-form-item label="Instant delivery">
            <a-switch v-model:checked="formState.delivery" />
          </a-form-item>
          <a-form-item label="Activity type">
            <a-checkbox-group v-model:value="formState.type">
              <a-checkbox value="1" name="type">Online</a-checkbox>
              <a-checkbox value="2" name="type">Promotion</a-checkbox>
              <a-checkbox value="3" name="type">Offline</a-checkbox>
            </a-checkbox-group>
          </a-form-item>
          <a-form-item label="Resources">
            <a-radio-group v-model:value="formState.resource">
              <a-radio value="1">Sponsor</a-radio>
              <a-radio value="2">Venue</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="Activity form">
            <a-input v-model:value="formState.desc" type="textarea" />
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="onSubmit">Create</a-button>
            <a-button style="margin-left: 10px">Cancel</a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
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
} from 'vue'
import { ELocalStorageKey, EDeviceTypeName } from '/@/types'
import { FormState } from '/@/types/land'
import step1 from '/@/components/land/add-land-form-modal/imgs/step1.png'
import step2 from '/@/components/land/add-land-form-modal/imgs/step2.png'
import step3 from '/@/components/land/add-land-form-modal/imgs/step3.png'
import step4 from '/@/components/land/add-land-form-modal/imgs/step4.png'

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
  'handleLandStageChange',
])

const userId = localStorage.getItem(ELocalStorageKey.UserId)!

const labelCol = { span: 4 }
const wrapperCol = { span: 14 }
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
  set: (newVal) => emit('handleLandStageChange', newVal),
})

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
</script>
<style scoped>
.add-land-form-wrap {
  display: flex;
  width: 100%;
  height: 100%;
}
.step-wrap{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.top-btn-wrap{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  padding:0 10px;
}
.step-content {
  width: 100%;
  flex:0 0 1;
}
.step-item {
  width: 100%;
  height: 138px;
}
</style>
