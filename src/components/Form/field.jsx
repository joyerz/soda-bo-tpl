// @flow
import * as React from 'react'
import moment from 'moment'
import { goc } from 'utils/objectHelper'
import { blurAdjust } from 'src/utils/browserDetect'

import FieldMap from './fieldMap'

const needHandledChild = [
  'checkbox',
  'radio',
  'select',
  'datapicker',
  'rangepicker',
  'timerange',
  'upload',
  'cascader'
] // 需要对值进行转换的组件

export default class Field extends React.Component<any> {
  onChange = (e: any): void => {
    const target = e && e.target
    let value = null
    if (target instanceof HTMLElement || goc(target, 'value') !== '') {
      value = target.value
    }
    else {
      value = e
    }
    if (this.props.type === 'datepicker') {
      value = value.valueOf()
      // if (!this.props.format || this.props.format === 'YYYY-MM-DD') {
      //   value = (moment(value).format('YYYY/MM/DD')).valueOf()
      // }
      // else {
      //   value = moment(value).valueOf()
      // }
    }
    else if (this.props.type === 'rangepicker') {
      if (!this.props.showTime) {
        value = [
          moment(moment(value[0]).format('YYYY-MM-DD' + ' 00:00:00')).valueOf(),
          moment(moment(value[1]).format('YYYY-MM-DD' + ' 23:59:59')).valueOf(),
        ]
      }
      else {
        value = [moment(value[0]).valueOf(), moment(value[1]).valueOf()]
      }
    }
    else if (this.props.type === 'timepicker') {
      value = moment(value).format('HH:mm')
    }
    else if (this.props.type === 'timerange') {
      if (value[0]) value[0] = moment(value[0]).format('HH:mm')
      if (value[1]) value[1] = moment(value[1]).format('HH:mm')
    }
    this.props.onChange(this.props.name, value)
  }

  render() {
    const { type, rules, validation, readOnly, addon, ...others } = this.props
    const FiledComponent = FieldMap[type] || null

    return readOnly && needHandledChild.indexOf(type) === -1
      ? (
        others.value !== undefined
          ? others.value
          : null
      )
      : FiledComponent && (
        <div>
          <FiledComponent
            {...others}
            readOnly={readOnly}
            onChange={this.onChange}
            onBlur={e => {
              if (['input', 'inputPassword', 'inputNumber'].includes(type)) {
                blurAdjust(e)
              }
              others.onBlur && others.onBlur(e)
            }}
          />
          {addon && typeof addon === 'function' && addon()}
        </div>
      )
  }
}
