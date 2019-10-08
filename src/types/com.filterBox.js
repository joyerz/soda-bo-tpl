import * as React from 'react'

export default {}

export type FilterBoxT = {
  title: string,
  open: boolean,
  extensible: boolean,
  children?: React.Node,
  loading?: boolean,
}
