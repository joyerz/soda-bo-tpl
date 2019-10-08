import * as React from 'react'
import { Icon } from 'antd'
import type { VoidFuncT } from 'src/types/actions'

type ConfigT = {
  img: string, // 验证码URL
  refreshImageCode: VoidFuncT, // 生成验证码的方法
  sendCodeButtonStatus: {
    enabled: boolean, // 发验证码的按钮可用状态
    count: number, // 不可用时的倒计时
  },
  onSendCode: VoidFuncT,
  isLoginning: boolean
}

export default (config: ConfigT): Array<any> => {
  const { img, sendCodeButtonStatus, onSendCode, isLoginning } = config

  return [
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
          placeholder: '请输入手机号',
          prefix: <Icon type='mobile' style={{color: '#85848b', fontSize: '14px'}}  />,
          display: true,
        },
      ],
    },
    // {
    //   span: 24,
    //   gutter: 16,
    //   type: 'field',
    //   fields: [
    //     {
    //       span: 13,
    //       responsive: {xs: 13, sm:13, md: 13},
    //       label: null,
    //       key: 'verification-pic-code',
    //       type: 'input',
    //       size: 'large',
    //       rules: ['max_length:5'],
    //       placeholder: '请输入图形验证码',
    //       maxLength: 5,
    //       prefix: <Icon type='lock' style={{color: '#85848b', fontSize: '14px'}}  />,
    //       display: true,
    //     },
    //     {
    //       span: 11,
    //       responsive: {xs: 11, sm:11, md: 11},
    //       label: null,
    //       key: 'img',
    //       type: 'render',
    //       field: 'render',
    //       rules: ['required',  'min_length:6'],
    //       maxLength: 5,
    //       display: true,
    //       render: () => <img src={img}
    //                          width='100%'
    //                          height={38}
    //                          onClick={refreshImageCode}
    //                          style={{ opacity: img ? 1 : 0 }} />,
    //     },
    //   ],
    // },
    {
      span: 24,
      gutter: 16,
      type: 'field',
      fields: [
        {
          span: 13,
          responsive: {xs: 13, sm:13, md: 13},
          label: null,
          key: 'sms',
          type: 'input',
          size: 'large',
          rules: ['required'],
          maxLength: 6,
          placeholder: '请输入短信验证码',
          prefix: <Icon type='lock' style={{color: '#85848b', fontSize: '14px'}}  />,
          display: true,
        },
        {
          span: 11,
          responsive: {xs: 11, sm:11, md: 11},
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
        },
      ],
    },
    {
      type: 'button',
      align: 'center',
      wrapperStyle: { border: 'none', background: 'none' },
      fields: [
        {
          label: '登录',
          key: 'submit',
          type: 'primary',
          size: 'large',
          block: true,
          disabled: isLoginning
        },
      ],
    },
  ]
}
