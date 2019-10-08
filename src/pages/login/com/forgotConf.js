import * as React from 'react'
import type { VoidFuncT } from 'src/types/actions'
import { Badge, Icon } from 'antd'
import { goto, pathInfo } from 'utils/url'

type ConfigT = {
  img: string, // 验证码URL
  refreshImageCode: VoidFuncT, // 生成验证码的方法
  sendCodeButtonStatus: {
    enabled: boolean, // 发验证码的按钮可用状态
    count: number, // 不可用时的倒计时
  },
  onSendCode: VoidFuncT
}
export default (config: ConfigT): Array<any> => {
  const { sendCodeButtonStatus, onSendCode } = config

  return [

    {
      span: 24,
      gutter: 16,
      type: 'field',
      fields: [
        {
          label: null,
          key: 'username',
          type: 'input',
          size: 'large',
          rules: ['required', 'username'],
          maxLength: 11,
          placeholder: '请输入用户名',
          prefix: <Icon type='user' style={{ color: '#85848b', fontSize: '14px' }} />,
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
          key: 'mobile',
          type: 'input',
          size: 'large',
          rules: ['required', 'number', 'min_length:11', 'max_length:11'],
          maxLength: 11,
          placeholder: '请输入登录手机号',
          prefix: <Icon type='mobile' style={{ color: '#85848b', fontSize: '14px' }} />,
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
          span: 13,
          responsive: { xs: 13, sm: 13, md: 13 },
          label: null,
          key: 'sms',
          type: 'input',
          size: 'large',
          rules: ['required'],
          maxLength: 6,
          placeholder: '请输入短信验证码',
          prefix: <Icon type='lock' style={{ color: '#85848b', fontSize: '14px' }} />,
          display: true,
        },
        {
          span: 11,
          responsive: { xs: 11, sm: 11, md: 11 },
          label: (!sendCodeButtonStatus.enabled && sendCodeButtonStatus.count > 0)
            ? `已发送(${sendCodeButtonStatus.count})`
            : '发送短信验证码',
          key: 'sendBtn',
          size: 'large',
          type: 'default',
          field: 'button',
          display: true,
          block: true,
          onClick: onSendCode,
          disabled: !sendCodeButtonStatus.enabled,
          addon: <div style={{ textAlign: 'right', position: 'absolute', width: '100%' }}>
            <a onClick={() => goto(pathInfo().first === 'forgot' ? '/login#password' : '/login-staff#password')}><Icon type='left' /> 返回登录</a>
          </div>,
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
          placeholder: '请输入新密码',
          maxLength: 20,
          prefix: <Icon type='lock' style={{color: '#85848b', fontSize: '14px'}}  />,
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
          placeholder: '请再次输入新密码',
          prefix: <Icon type='lock' style={{color: '#85848b', fontSize: '14px'}}  />,
          maxLength: 20,
          display: true,
        },
      ],
    },

    {
      type: 'button',
      align: 'center',
      wrapperStyle: { border: 'none' },
      fields: [
        {
          label: '提交',
          key: 'submit',
          type: 'primary',
          size: 'large',
          block: true,
        },
      ],
    },
  ]
}
