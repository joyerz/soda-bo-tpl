export default {}

const MOCK_MODE = false

export function mockDataWrapper(data, page, limit) {
  return !MOCK_MODE
    ? dataFormat(data)
    : {
      entries: data,
      page,
      per_page: Number(limit),
      total_page: 2,
      total_count: 12,
    }
}

export function mockAPIWrapper(api) {
  return !MOCK_MODE
    ? api
    : (() => {
      api = api.replace('page-limit', '_limit')
      api = api.replace('page', '_page')
      return api
    })()
}

const dataFormat = (data: any) => ({
  entries: data.data,
  page: data.page_no,
  page_limit: data.page_size,
  total_count: data.count,
  total_page: Math.ceil(data.count / data.page_size),
})
