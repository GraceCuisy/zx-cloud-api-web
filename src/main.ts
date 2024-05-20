import App from './App.vue'
import router from './router'
import { antComponents } from './antd'
import { CommonComponents } from './use-common-components'
import 'virtual:svg-icons-register'
import store, { storeKey } from './store'
import { createInstance } from '/@/root'
import VueAMap, { initAMapApiLoader } from '@vuemap/vue-amap'
import { AMapConfig } from '/@/constants/index'
import { useDirectives } from './directives'
import '@vuemap/vue-amap/dist/style.css'

import '/@/styles/index.scss'

// 初始化vue-amap
initAMapApiLoader({
  // 高德的key
  key: AMapConfig.key,
  securityJsCode: AMapConfig.securityJsCode, // 新版key需要配合安全密钥使用
})

const app = createInstance(App)

app.use(store, storeKey)
app.use(router)
app.use(CommonComponents)
app.use(antComponents)
app.use(VueAMap)
app.use(useDirectives)
app.mount('#demo-app')
