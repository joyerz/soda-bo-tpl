export default {}

export type ListT = {
  loading: boolean,
  success: boolean,
  error: boolean,
  params: {},
  defaultSort: {},
  data: ListItemT
}

export type ListItemT = {
  page: number,
  per_page: string,
  total_count: number,
  entries: Array<any>
}

export type ItemT = {
  loading: boolean,
  success: boolean,
  error: boolean,
}
