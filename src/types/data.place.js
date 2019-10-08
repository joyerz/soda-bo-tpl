// @flow
import { ListT, ListItemT } from 'src/types/base.list'

export default {}

export type PlaceT = {
  ...ListT,
  data: {
    ...ListItemT,
    entries: PlaceItemT
  }
}

export type PlaceItemT = {
  name: string,
  leader_name: string,
  'rooms.name'?: string,
  address?: string,
  username?: string,
  leader_mobile: number | string
}
