import { LandListParams } from '../types/land'
import request, { IPage, IWorkspaceResponse } from '/@/api/http/request'
const HTTP_PREFIX = '/farmland/api/v1'

// 获取地块列表
export const getLandList = async function (userId:string, params:LandListParams): Promise<IWorkspaceResponse<any>> {
  const url = `${HTTP_PREFIX}/field/${userId}/fields`
  const result = await request.get(url, {
    params,
  })
  return result.data
}
// // add element
// export const postElementsReq = async (pid: string, body: PostElementsBody): Promise<IWorkspaceResponse<{ id: string }>> => {
//   const url = `${PREFIX}/workspaces/` + workspace_id + `/element-groups/${pid}/elements`
//   const result = await request.post(url, body)
//   return result.data
// }
