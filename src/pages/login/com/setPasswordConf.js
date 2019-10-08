import * as React from 'react'
import {Icon} from 'antd'

import './setPassword.scss'

export default [
  {
    span: 24,
    gutter: 16,
    type: 'field',
    fields: [
      {
        label: '',
        key: 'username',
        type: 'input',
        size: 'large',
        rules: [],
        readOnly: true,
        display: true,
      },
    ],
  },
  {
    span: 24,
    gutter: 16,
    type: 'field',
    fields: [
      {
        label: null,
        key: 'render',
        type: 'render',
        field: 'render',
        render: () => (
          <div styleName="pwdWarning">
            <Icon type="exclamation-circle" styleName="icon" />密码为大小写字母+数字的组合，长度6-20位
          </div>
        ),
        display: true,
      },
    ],
  },
  {
    span: 24,
    gutter: 16,
    type: 'field',
    fields: [
      {
        label: null,
        key: 'new_password',
        type: 'inputPassword',
        size: 'large',
        rules: ['required', 'min_length:6', 'password'],
        placeholder: '请输入密码',
        maxLength: 20,
        display: true,
      },
    ],
  },
  {
    span: 24,
    gutter: 16,
    type: 'field',
    fields: [
      {
        label: null,
        key: 'new_password_confirm',
        type: 'inputPassword',
        size: 'large',
        rules: ['required', 'min_length:6', 'password'],
        placeholder: '请再次输入密码',
        maxLength: 20,
        display: true,
        validator: (value, getFieldValue) => {
          if (getFieldValue('new_password') !== value) {
            return {
              validated: false,
              msg: '两次密码不一致'
            }
          }
          return {
            validated: true,
            msg: ''
          }
        }
      },
    ],
  },
  {
    type: 'button',
    align: 'center',
    wrapperStyle: { border: 'none', paddingTop: 32 },
    fields: [
      {
        label: '保存',
        key: 'submit',
        type: 'primary',
        size: 'large',
        block: true,
      },
    ],
  },
]