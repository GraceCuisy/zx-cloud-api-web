<template>
  <div class="left-bar-wrap">
    <a-menu
      @click="handleMenuClick"
      mode="inline"
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKeys"
      :style="{ height: '100%', borderRight: 0 }"
    >
      <template v-for="item in leftRouteList" :key="item.path">
        <a-sub-menu v-if="item.children && item.children.length > 0 " :key="item.path">
          <template #title>
            <span>
              <user-outlined />
              {{ item.name }}
            </span>
          </template>
          <a-menu-item v-for="j in item.children" :key="j.path">{{
            j.name
          }}</a-menu-item>
        </a-sub-menu>
        <a-menu-item v-else :key="item.path">
          {{item.name}}
        </a-menu-item>
      </template>
    </a-menu>
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
import { RouteRecordRaw, useRoute, useRouter } from 'vue-router'
import { MenuInfo } from 'ant-design-vue/lib/menu/src/interface'

const root = getRoot()
const route = useRoute()

interface IOptions {
  key: number;
  label: string;
  path:
    | string
    | {
        path: string;
        query?: any;
      };
  icon: string;
}

const selectedKeys = ref<string[]>([])
const openKeys = ref<string[]>([])
const username = ref(localStorage.getItem(ELocalStorageKey.Username))
const workspaceName = ref('')
const optionRoutes = reactive(root.$router.options.routes)
const firstLevelPath = ref('')

const leftRouteList = computed(
  () => optionRoutes.filter((i) => i.path === firstLevelPath.value)[0]?.children
)

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

watch(() => route.path, newRoute => {
  const res = findAllParentValue(newRoute, optionRoutes)
  if (res.length === 0) {
    if (optionRoutes.findIndex((i:any) => i.path === newRoute) !== -1) {
      firstLevelPath.value = newRoute
    }
  } else {
    firstLevelPath.value = res[res.length - 1]
  }
  if (leftRouteList.value && leftRouteList.value.length > 0) {
    // @ts-ignore
    const res1 = findAllParentValue(newRoute, leftRouteList.value)
    if (res1.length === 0) {
      if (leftRouteList.value && leftRouteList.value.findIndex((i:any) => i.path === newRoute) !== -1) {
        selectedKeys.value = [newRoute]
      }
    } else {
      selectedKeys.value = [...res1, newRoute]
      openKeys.value = res1
    }
  }
}, {
  deep: true,
  immediate: true
})

onMounted(() => {
  getPlatformInfo().then((res) => {
    workspaceName.value = res.data.workspace_name
  })
})

// 菜单点击
const handleMenuClick = (e:MenuInfo) => {
  const currentPath = e.keyPath ? e.keyPath[e.keyPath.length - 1] : ''
  if (currentPath) {
    // @ts-ignore
    root.$router.push(currentPath)
  }
}
</script>

<style lang="scss" scoped>
@import "/@/styles/index.scss";
.left-bar-wrap {
  width: 200px;
  height: 300px;
}
</style>
