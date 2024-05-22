<template>
  <div class="width-100 flex-row flex-justify-between flex-align-center" style="height: 60px;">
    <div class="height-100">
      <a-avatar :size="40" shape="square" :src="cloudapi" />
      <span class="ml10 fontBold">{{ workspaceName }}</span>
    </div>

    <a-space class="fz16 height-100" size="large">
        <router-link
        v-for="item in options"
        :key="item.key"
        :to="item.path"
        :class="{
            'menu-item': true,
        }">
          <!-- <span @click="selectedRoute(item.path)" :style="selected === item.path ? 'color: #2d8cf0;' : 'color: white'">{{ item.label }}</span> -->
          <span @click="selectedRoute(item.path)" :style="firstLevelPath === item.path ? 'color: #2d8cf0;' : 'color: white'">{{ item.label }}</span>
        </router-link>
    </a-space>

    <div class="height-100 fz16 flex-row flex-justify-between flex-align-center">
      <a-dropdown>
        <div class="height-100">
          <span class="fz20 mt20" style="border: 2px solid white; border-radius: 50%; display: inline-flex;"><UserOutlined /></span>
          <span class="ml10 mr10" style="float: right;">{{ username }}</span>
        </div>
        <template #overlay>
          <a-menu theme="dark" class="flex-column flex-justify-between flex-align-center">
            <a-menu-item>
              <span class="mr10" style="font-size: 16px;"><ExportOutlined /></span>
              <span @click="logout">Log Out</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { message } from 'ant-design-vue'
import { computed, defineComponent, onMounted, reactive, ref, watch } from 'vue'
import { getRoot } from '/@/root'
import { getPlatformInfo } from '/@/api/manage'
import { ELocalStorageKey, ERouterName } from '/@/types'
import { UserOutlined, ExportOutlined } from '@ant-design/icons-vue'
import cloudapi from '/@/assets/icons/cloudapi.png'
import routes from '/@/router'
import { RouteRecordRaw, useRoute } from 'vue-router'

const route = useRoute()
const root = getRoot()

interface IOptions {
  key: number
  label: string
  path:
    | string
    | {
        path: string
        query?: any
      }
  icon: string
}
const username = ref(localStorage.getItem(ELocalStorageKey.Username))
const workspaceName = ref('')
// const options = [
//   { key: 0, label: ERouterName.WORKSPACE.charAt(0).toUpperCase() + ERouterName.WORKSPACE.substr(1), path: '/' + ERouterName.WORKSPACE },
//   { key: 1, label: ERouterName.MEMBERS.charAt(0).toUpperCase() + ERouterName.MEMBERS.substr(1), path: '/' + ERouterName.MEMBERS },
//   { key: 2, label: ERouterName.DEVICES.charAt(0).toUpperCase() + ERouterName.DEVICES.substr(1), path: '/' + ERouterName.DEVICES },
//   { key: 3, label: ERouterName.FIRMWARES.charAt(0).toUpperCase() + ERouterName.FIRMWARES.substr(1), path: '/' + ERouterName.FIRMWARES },
// ]

const selected = ref<string>(root.$route.path)
const firstLevelPath = ref('')
const optionRoutes = reactive(root.$router.options.routes)
const options = computed(() => optionRoutes.filter(i => i.path !== '/' && i.path !== '/login').map((i, index) => {
  return {
    key: index,
    label: i.name,
    path: i.path,
  }
}))

onMounted(() => {
  getPlatformInfo().then(res => {
    workspaceName.value = res.data.workspace_name
  })
  console.log('routes111==>', root.$router.options.routes)
})

const findAllParentValue = (value: string, list: RouteRecordRaw[], parentList: string[] = [], index = 0, i = 0) => {
  if (!value) return []
  findParentValue(value, list, parentList)
  // 将查询的结果元素作为下次查询的目标元素，继续寻找其父元素
  findAllParentValue(parentList[index], list, parentList, ++index)
  return parentList
}

const findParentValue = (value: string, list: RouteRecordRaw[], parentList: string[]) => {
  for (let i = 0; i < list.length; i++) {
    // 没有子元素children直接跳出当前循环
    if (!list[i]!.children?.length) continue
    // 查询条件：数组对象子元素中是否有与目标元素相等的属性
    const isFind = !!list[i]!.children?.find((item: RouteRecordRaw) => item.path === value)
    if (isFind) {
      // 有则添加至结果数组
      parentList.push(list[i]!.path as string)
      return
    } else {
      // 没有则遍历children内数组子元素，判断是否含有目标元素
      findParentValue(value, list[i].children!, parentList)
    }
  }
}

function selectedRoute (path: string) {
  selected.value = path
}

const logout = () => {
  localStorage.clear()
  root.$router.push(ERouterName.LOGIN)
}

watch(() => route.path, newRoute => {
  const res = findAllParentValue(newRoute, optionRoutes)
  if (res.length === 0) {
    if (optionRoutes.findIndex((i:any) => i.path === newRoute) !== -1) {
      firstLevelPath.value = newRoute
    }
  } else {
    firstLevelPath.value = res[res.length - 1]
  }
}, {
  deep: true,
  immediate: true
})
</script>

<style lang="scss" scoped>
@import '/@/styles/index.scss';

.fontBold {
  font-weight: 500;
  font-size: 18px;
}

</style>
