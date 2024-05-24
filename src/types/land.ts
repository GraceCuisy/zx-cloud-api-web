export interface LandListParams {
  /** 地块名称 */
  name?:string;
  /** 地块编号 */
  field_no?:string;
  /** 页码 */
  page:number;
  /** 每页条数 */
  page_size:number;
  /** 排序字段 */
  orderBy?:string;
  /** 升降序 */
  asc?:boolean;
}

export interface FormState {
  name: string;
  region: string | undefined;
  delivery: boolean;
  type: string[];
  resource: string;
  desc: string;
}
