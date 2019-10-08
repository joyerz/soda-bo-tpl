// @flow
import * as React from 'react'
import { Badge } from 'antd'

type Props = {
  statusMap: {},
  statusMapBadge?: {},
  value: string | null,
}

const index = (props: Props) => {
  const { statusMap, statusMapBadge, value } = props

  return (
    value && statusMap[value]
      ? (
        <span>
          { statusMapBadge && statusMapBadge[value] &&
          <Badge status={statusMapBadge[value]} />
          }
          { statusMap[value] }
        </span>
        )
      : ''
  )
}

export default index
