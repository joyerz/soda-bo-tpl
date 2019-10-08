// @flow
import { ListT, ListItemT } from 'src/types/base.list'

export default {}

export type AccountT = {
  ...ListT,
  data: {
    ...ListItemT,
    entries: AccountItemT
  }
}

export type AccountItemT = {
  id: string,
  name: string,
  mobile: string,
  username?: string,
  inActive?: string,
}