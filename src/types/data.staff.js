// @flow
import { ListT, ListItemT } from 'src/types/base.list'

export default {}

export type StaffT = {
  ...ListT,
  data: {
    ...ListItemT,
    entries: StaffItemT
  }
}

export type StaffItemT = {
  name: string,
  mobile: string,
  sex?: string,
  'place.address'?: string,
  id_no?: string,
  'position_vo.name': number,
  appointment_not_checked: boolean
}
