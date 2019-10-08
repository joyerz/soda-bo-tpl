import * as React from 'react'

export default {}

export type FieldsConfT = {
  span?: number,
  gutter?: number, // 跟span组合控制一排展示几个，间隔多少
  type?: string, // button, field 表示该组是按钮还是输入
  align?: string, // left, right, center
  fields: Array<ButtonT | FieldT>,
}

export type ButtonT = {
  label: string,
  key: string, // submit, reset, button
  type?: 'primary', // primary or leave it empty
  onClick?: () => void, // callback
}

export type FieldT = {
  label: string,
  key: string,
  type: string, // input, select, checkbox, radio, textarea, ...
  items?: Array<FieldItemT> | (() => Array<FieldItemT>), // 当field的类型是选择型的时候 eg: checkbox, radio, select
  rules: [],
  span?: number,
  readOnly?: boolean, // 只读状态
  addon?: string | (() => React.Node), // 底部说明信息
}

export type FieldItemT = {
  label: string,
  value: string | number,
}
