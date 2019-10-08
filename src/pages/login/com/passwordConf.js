import * as React from 'react'
import type { VoidFuncT } from 'src/types/actions'
import { goto, pathInfo } from 'utils/url'
import { Icon } from 'antd'

export default (img: string, isLoginning: boolean) => [
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
        rules: ['required'],
        placeholder: '请输入账号或手机号',
        prefix: <Icon type='mobile' style={{color: '#85848b', fontSize: '14px'}}  />,
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
        key: 'password',
        type: 'inputPassword',
        size: 'large',
        rules: ['required'],
        placeholder: '请输入密码',
        prefix: <Icon type='lock' style={{color: '#85848b', fontSize: '14px'}}  />,
        display: true,
      },
      // {
      //   span: 0,
      //   label: null,
      //   key: 'render',
      //   type: 'render',
      //   size: 'large',
      //   rules: [],
      //   display: true,
      //   render: () => <span />,
      //   addon: () => (
      //     <div style={{ textAlign: 'right', position: 'relative', zIndex: 2, width: '100%', height: '0', lineHeight: '20px', transform: 'translateY(-12px)'}}>
      //       <a onClick={() => goto(pathInfo().first === 'login' ? '/forgot' : '/forgot-staff')}>忘记密码?</a>
      //     </div>
      //   ),
      // },

    ],
  },
  {
    type: 'button',
    align: 'center',
    wrapperStyle: { border: 'none', marginTop: '-18px'  },
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
