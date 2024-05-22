<template>
  <a-layout class="custom-layout-wrap">
    <a-layout-header class="custom-layout-header">
      <div class="logo" />
       <TopbarNew />
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff" class="left">
        <Leftbar/>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-layout-content
          :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
        >
          <router-view/>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue'
import TopbarNew from '/@/components/common/topbar-new.vue'
import leftBar from '/@/components/common/leftbar.vue'
import { onMounted, reactive, ref, UnwrapRef, watch } from 'vue'
import { getRoot } from '/@/root'
import { EBizCode, ELocalStorageKey, ERouterName } from '/@/types'
import { useConnectWebSocket } from '/@/hooks/use-connect-websocket'
import EventBus from '/@/event-bus'

interface FormState {
  user: string
  password: string
}

const selectedKeys1 = ref<string[]>(['2'])
const selectedKeys2 = ref<string[]>(['1'])
const collapsed = ref<boolean>(false)
const openKeys = ref<string[]>(['sub1'])

const root = getRoot()

const messageHandler = async (payload: any) => {
  if (!payload) {
    return
  }
  switch (payload.biz_code) {
    case EBizCode.DeviceUpgrade: {
      EventBus.emit('deviceUpgrade', payload)
      break
    }
    case EBizCode.DeviceLogUploadProgress: {
      EventBus.emit('deviceLogUploadProgress', payload)
      break
    }
  }
}

// 监听ws 消息
useConnectWebSocket(messageHandler)

onMounted(() => {
  const token = localStorage.getItem(ELocalStorageKey.Token)
  if (!token) {
    root.$router.push(ERouterName.PROJECT)
  }
})

</script>

<style lang="scss" scoped>
@import '/@/styles/index.scss';

.fontBold {
  font-weight: 500;
  font-size: 18px;
}
.custom-layout-wrap{
  width: 100vw;
  height: 100vh;
}
.custom-layout-header {
  flex:0 0 60px;
  background-color: black;
  color: white;
  height: 60px;
  font-size: 15px;
  padding: 0 20px;
}
</style>
