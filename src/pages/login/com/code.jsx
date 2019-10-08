// @flow
import * as React from 'react'
import Form from 'com/Form'
import type { ActionModifyT, VoidFuncT } from 'src/types/actions'
import { goc } from 'utils/objectHelper'
import { pathInfo } from 'utils/url'
import UserManager from 'src/services/userManager'
import fieldsConf from './codeConf'

type PropsT = {
  data: {
    success: boolean,
    loading: boolean,
    error: boolean,
  },
  actionSendCode: ActionModifyT,
  actionSendCodeReset: VoidFuncT,
}

type StateT = {
  image: {
    src: ?string,
    uuid: ?string,
  },
  data: any,
  count: number, // 发送验证码后的倒计时
  isLoginning: boolean // 是否正在登录
}

export default class Code extends React.Component<PropsT, StateT> {
  state = {
    image: {
      src: '',
      uuid: null,
    },
    data: {},
    count: 0,
    isLoginning: false,
  }
  mounted = false

  constructor(props: PropsT) {
    super(props)
    // UserManager.fetchNoRepeatToken()
  }

  componentWillUnmount() {
    this.mounted = false
  }

  componentDidMount() {
    this.mounted = true
  }

  componentDidUpdate(prevProps: any): void {
    // 发送成功后，倒计时
    if (!prevProps.data.success && this.props.data.success) {
      this.sendCodeButtonCount()
    }
  }

  /**
   * 倒计时
   * @param count
   */
  sendCodeButtonCount = (count: number = 60) => {
    count--
    if (count <= 0) {
      count = 0
      this.props.actionSendCodeReset()
    }
    else {
      setTimeout(() => this.sendCodeButtonCount(count), 1000)
    }
    this.mounted && this.setState({ count })
  }


  /**
   * send sms code
   */
  onSendCode = () => {
    const data: any = {
      mobile: goc(this.state.data, 'mobile'),
    }
    this.props.actionSendCode({ data })
  }

  /**
   * on form changes
   * @param name
   * @param value
   * @param data
   */
  onChange = (name: string, value: any, data: any) => {
    this.setState({ data })
  }

  /**
   * 判断发送按钮的状态
   * @return {{count: number, enabled: (*|boolean)}}
   */
  checkSendCodeButtonStatus = () => {
    const { data } = this.state
    // const result = data.phone && data.phone.length === 11 && data['verification-pic-code'] && data['verification-pic-code'].length === 5
    const result = data.mobile && data.mobile.length === 11

    return {
      enabled: result && !this.props.data.success && !this.props.data.loading,
      count: this.state.count,
    }
  }

  /**
   * 登录
   * @param data
   */
  onSubmit = (data: any) => {
    this.setState({ isLoginning: true }) // 开始禁用登录按钮
    const loginData: any = {
      metadata: {
        mechanism: 'password_and_code',
      },
      username: data.mobile,
      password: '',
      $code: data.sms,
    }
    if (loginData.loginType === 'TENANT') {
      loginData.tenantId = 1016
    }

    UserManager.loginByCode(
      loginData,
      () => {
        const { data } = this.state
        this.setState({
          isLoginning: false, // 启用登录按钮
        })
        UserManager.fetchNoRepeatToken()
      },
      () => {
        this.setState({ isLoginning: false })  // 启用登录按钮
      }
    )
  }

  onReset = () => {
  }

  render() {
    const fields = fieldsConf({
      img: this.state.image.src,
      sendCodeButtonStatus: this.checkSendCodeButtonStatus(),
      onSendCode: this.onSendCode,
      isLoginning: this.state.isLoginning
    })
    return (
      <Form
        onChangeValidate={false}
        fieldsConf={fields}
        dataSource={this.state.data}
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        onReset={this.onReset}
        collSpanAutoAdapt={false}
      />
    )
  }
}
