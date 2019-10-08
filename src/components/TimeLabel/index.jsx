// @flow
import * as React from 'react'
import moment from 'moment'
import { DATE_FORMAT, DATE_TIME_FORMAT } from 'conf/index'

type Props = {
  type: string,
  value: number | string | {} | null,
}

const typeMap = {
  'date': DATE_FORMAT,
  'dateTime': DATE_TIME_FORMAT,
}

const TimeLabel = (props: Props) => (
  props.value
    ? <span>{moment(props.value).format(typeMap[props.type || 'dateTime'])}</span>
    : null
)

TimeLabel.defaultProps = {
  type: 'date'
}

export default TimeLabel
