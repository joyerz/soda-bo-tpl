// @flow
import { ListT, ListItemT } from 'src/types/base.list'

export default {}

export type OfficeT = {
  ...ListT,
  data: {
    ...ListItemT,
    entries: OfficeItemT
  }
}

export type OfficeItemT = {
  name: string,
  mobile: string,
  sex?: string,
  'place.address'?: string,
  id_no?: string,
  'position_vo.name': number,
  appointment_not_checked: boolean
}
