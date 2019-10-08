// @flow
import type { ListT } from './base.list'

export type LockListT = {
  ...ListT,
  data: {
    ...ListT.data,
    entries: Array<LockItemT>
  }
}

export type LockItemT = {
  id: string | number,
  name: string,
}