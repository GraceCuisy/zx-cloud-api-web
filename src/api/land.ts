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
