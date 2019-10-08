import { API } from 'conf/api'
import UUID from 'uuid-js'
import doFetch from 'utils/fetch'

export default async function getImageCode() {
  const uuid = UUID.create().toString()
  const data = await doFetch({
    url: `${API.login.pic}?uuid=${uuid}`,
    method: 'GET',
  })

  return {
    src: data.value,
    uuid: uuid,
  }
}