// @flow
import * as React from 'react'
import { Badge } from 'antd'
import { DEVICE_STATUS, DEVICE_STATUS_BADGE } from 'conf/enum'

type Props = {
  value: string
}

const index = (props: Props) => (
  DEVICE_STATUS[props.value]
    ?
    <>
      <Badge status={DEVICE_STATUS_BADGE[props.value]}/>
      {DEVICE_STATUS[props.value]}
    </>
    : ''
)

export default index
