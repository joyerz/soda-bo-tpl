// @flow
import { ListT, ListItemT } from 'src/types/base.list'

export default {}

export type LockInformationT = {
  ...ListT,
  data: {
    ...ListItemT,
    entries: LockInformationItemT
  }
}

export type LockInformationItemT = {
  id: string,
  lock_id: string,
  company: string,
  place: string,
  address?: string,
  room?: string,
  lock_status?: string,
  lock_health_status?: string,
}