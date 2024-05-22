import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { ERouterChineseName, ERouterName } from '/@/types/index'
import CreatePlan from '/@/components/task/CreatePlan.vue'
import WaylinePanel from '/@/pages/page-web/projects/wayline.vue'
import DockPanel from '/@/pages/page-web/projects/dock.vue'
import LiveAgora from '/@/components/livestream-agora.vue'
import LiveOthers from '/@/components/livestream-others.vue'

const routes1: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/' + ERouterName.PROJECT
  },
  // 首页 登录页面
  {
    path: '/' + ERouterName.PROJECT,
    name: ERouterName.PROJECT,
    component: () => import('/@/pages/page-web/index.vue')
  },
  // members, devices
  {
    path: '/' + ERouterName.SYSTEM,
    name: ERouterName.SYSTEM,
    component: () => import('../pages/page-web/home-new.vue'),
    // path: '/' + ERouterName.HOME,
    // name: ERouterName.HOME,
    // component: () => import('/@/pages/page-web/home.vue'),
    children: [
      {
        path: '/' + ERouterName.MEMBERS,
        name: ERouterName.MEMBERS,
        component: () => import('/@/pages/page-web/projects/members.vue'),
        children: [
          {
            path: '/' + ERouterName.TEST_PAGE,
            name: ERouterName.TEST_PAGE,
            component: () => import('/@/pages/page-web/projects/test-page.vue')
          },
        ]
      },
      {
        path: '/' + ERouterName.DEVICES,
        name: ERouterName.DEVICES,
        component: () => import('/@/pages/page-web/projects/devices.vue')
      },
      {
        path: '/' + ERouterName.FIRMWARES,
        name: ERouterName.FIRMWARES,
        component: () => import('../pages/page-web/projects/Firmwares.vue')
      },
      {
        path: '/' + ERouterName.TEST_PAGE,
        name: ERouterName.TEST_PAGE,
        component: () => import('../pages/page-web/projects/test-page.vue')
      }
    ]
  },
  // workspace
  {
    path: '/' + ERouterName.WORKSPACE,
    name: ERouterName.WORKSPACE,
    component: () => import('/@/pages/page-web/projects/workspace.vue'),
    redirect: '/' + ERouterName.TSA,
    children: [
      {
        path: '/' + ERouterName.TSA,
        component: () => import('/@/pages/page-web/projects/tsa.vue')
      },
      {
        // 实况视频流
        path: '/' + ERouterName.LIVESTREAM,
        name: ERouterName.LIVESTREAM,
        component: () => import('/@/pages/page-web/projects/livestream.vue'),
        children: [
          {
            path: ERouterName.LIVING,
            name: ERouterName.LIVING,
            components: {
              LiveAgora,
              LiveOthers
            }
          }
        ]
      },
      {
        path: '/' + ERouterName.LAYER,
        name: ERouterName.LAYER,
        component: () => import('/@/pages/page-web/projects/layer.vue')
      },
      {
        path: '/' + ERouterName.MEDIA,
        name: ERouterName.MEDIA,
        component: () => import('/@/pages/page-web/projects/media.vue')
      },
      {
        // 航线库
        path: '/' + ERouterName.WAYLINE,
        name: ERouterName.WAYLINE,
        component: () => import('/@/pages/page-web/projects/wayline.vue')
      },
      {
        // 飞行任务库
        path: '/' + ERouterName.TASK,
        name: ERouterName.TASK,
        component: () => import('/@/pages/page-web/projects/task.vue'),
        children: [
          {
            path: ERouterName.CREATE_PLAN,
            name: ERouterName.CREATE_PLAN,
            component: CreatePlan,
            children: [
              {
                path: ERouterName.SELECT_PLAN,
                name: ERouterName.SELECT_PLAN,
                components: {
                  WaylinePanel,
                  DockPanel
                }
              }
            ]
          }

        ]
      },
      {
        // 自定义飞行区
        path: '/' + ERouterName.FLIGHT_AREA,
        name: ERouterName.FLIGHT_AREA,
        component: () => import('/@/pages/page-web/projects/flight-area.vue')
      },
    ]
  },
  // pilot
  {
    path: '/' + ERouterName.PILOT,
    name: ERouterName.PILOT,
    component: () => import('/@/pages/page-pilot/pilot-index.vue'),
  },
  {
    path: '/' + ERouterName.PILOT_HOME,
    component: () => import('/@/pages/page-pilot/pilot-home.vue')
  },
  {
    path: '/' + ERouterName.PILOT_MEDIA,
    component: () => import('/@/pages/page-pilot/pilot-media.vue')
  },
  {
    path: '/' + ERouterName.PILOT_LIVESHARE,
    component: () => import('/@/pages/page-pilot/pilot-liveshare.vue')
  },
  {
    path: '/' + ERouterName.PILOT_BIND,
    component: () => import('/@/pages/page-pilot/pilot-bind.vue')
  }
]

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/' + ERouterName.PROJECT
  },
  // 首页 登录页面
  {
    path: '/' + ERouterName.PROJECT,
    name: ERouterChineseName.PROJECT,
    component: () => import('/@/pages/page-web/index.vue')
  },
  {
    path: '/' + ERouterName.AGRI_HOME,
    name: ERouterChineseName.AGRI_HOME,
    component: () => import('/@/pages/page-web/projects/test-page.vue'),
  },
  {
    path: '/' + ERouterName.AGRI_LAND,
    name: ERouterChineseName.AGRI_LAND,
    component: () => import('../pages/page-web/home-new.vue'),
    redirect: '/' + ERouterName.AGRI_LAND_INFO,
    children: [
      {
        path: '/' + ERouterName.AGRI_LAND_INFO,
        name: ERouterChineseName.AGRI_LAND_INFO,
        component: () => import('../pages/page-web/agri-projects/developing-page.vue'),
        children: [
          {
            path: '/' + 'agri-land-info-test',
            name: 'agri-land-info-test',
            component: () => import('../pages/page-web/agri-projects/developing-page.vue'),
          }]
      },
      {
        path: '/' + ERouterName.AGRI_LAND_SECTION,
        name: ERouterChineseName.AGRI_LAND_SECTION,
        component: () => import('../pages/page-web/agri-projects/developing-page.vue'),
      },
      {
        path: '/' + ERouterName.AGRI_BASE_MAP_DRAW,
        name: ERouterChineseName.AGRI_BASE_MAP_DRAW,
        component: () => import('../pages/page-web/agri-projects/developing-page.vue'),
      },
    ]
  },
  {
    path: '/' + ERouterName.AGRI_EXPERIMENT,
    name: ERouterChineseName.AGRI_EXPERIMENT,
    component: () => import('../pages/page-web/home-new.vue'),
  },
  {
    path: '/' + ERouterName.AGRI_UAV,
    name: ERouterChineseName.AGRI_UAV,
    component: () => import('/@/pages/page-web/projects/workspace.vue'),
    redirect: '/' + ERouterName.TSA,
    children: [
      {
        path: '/' + ERouterName.TSA,
        name: ERouterChineseName.TSA,
        component: () => import('/@/pages/page-web/projects/tsa.vue')
      },
      {
        // 实况视频流
        path: '/' + ERouterName.LIVESTREAM,
        name: ERouterChineseName.LIVESTREAM,
        component: () => import('/@/pages/page-web/projects/livestream.vue'),
        children: [
          {
            path: ERouterName.LIVING,
            name: ERouterChineseName.LIVING,
            components: {
              LiveAgora,
              LiveOthers
            }
          }
        ]
      },
      {
        path: '/' + ERouterName.LAYER,
        name: ERouterChineseName.LAYER,
        component: () => import('/@/pages/page-web/projects/layer.vue')
      },
      {
        path: '/' + ERouterName.MEDIA,
        name: ERouterChineseName.MEDIA,
        component: () => import('/@/pages/page-web/projects/media.vue')
      },
      {
        // 航线库
        path: '/' + ERouterName.WAYLINE,
        name: ERouterChineseName.WAYLINE,
        component: () => import('/@/pages/page-web/projects/wayline.vue')
      },
      {
        // 飞行任务库
        path: '/' + ERouterName.TASK,
        name: ERouterChineseName.TASK,
        component: () => import('/@/pages/page-web/projects/task.vue'),
        children: [
          {
            path: ERouterName.CREATE_PLAN,
            name: ERouterChineseName.CREATE_PLAN,
            component: CreatePlan,
            children: [
              {
                path: ERouterName.SELECT_PLAN,
                name: ERouterChineseName.SELECT_PLAN,
                components: {
                  WaylinePanel,
                  DockPanel
                }
              }
            ]
          }

        ]
      },
      {
        // 自定义飞行区
        path: '/' + ERouterName.FLIGHT_AREA,
        name: ERouterChineseName.FLIGHT_AREA,
        component: () => import('/@/pages/page-web/projects/flight-area.vue')
      },
      {
        path: '/' + ERouterName.DEVICES,
        name: ERouterChineseName.DEVICES,
        component: () => import('/@/pages/page-web/projects/devices.vue')
      },
    ]
  },
  {
    path: '/' + ERouterName.AGRI_COMPUTE,
    name: ERouterChineseName.AGRI_COMPUTE,
    component: () => import('../pages/page-web/home-new.vue'),
    redirect: '/' + ERouterName.AGRI_IMG_JOINT,
    children: [
      {
        path: '/' + ERouterName.AGRI_IMG_JOINT,
        name: ERouterChineseName.AGRI_IMG_JOINT,
        component: () => import('../pages/page-web/home-new.vue'),
      },
      {
        path: '/' + ERouterName.AGRI_THREE_CLOUD,
        name: ERouterChineseName.AGRI_THREE_CLOUD,
        component: () => import('../pages/page-web/home-new.vue'),
      },
      {
        path: '/' + ERouterName.AGRI_LAND_IDENTIFY,
        name: ERouterChineseName.AGRI_LAND_IDENTIFY,
        component: () => import('../pages/page-web/home-new.vue'),
      },
      {
        path: '/' + ERouterName.AGRI_SECTION_IDENTIFY,
        name: ERouterChineseName.AGRI_SECTION_IDENTIFY,
        component: () => import('../pages/page-web/home-new.vue'),
      },
      {
        path: '/' + ERouterName.AGRI_OTHER_INDEX,
        name: ERouterChineseName.AGRI_OTHER_INDEX,
        component: () => import('../pages/page-web/home-new.vue'),
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
