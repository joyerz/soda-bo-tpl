// @flow
import * as React from 'react'
import Form from 'com/Form'
import UserManager from 'src/services/userManager'
import { pathInfo } from 'utils/url'
import fieldsConf from './passwordConf'

type Props = {
}

type State = {
  data: any,
  image: {
    src: string,
    uuid: string,
  },
  isLoginning: boolean
}

export default class Code extends React.PureComponent<Props, State> {
  state = {
    data: {},
    image: {},
    isLoginning: false
  }
  mounted = false

  componentWillUnmount() {
    this.mounted = false
  }

  componentDidMount() {
    this.mounted = true
  }

  onSubmit = (data: { username: string, password: string, imgCode: string}): void => {
    this.setState({ isLoginning: true }) // 开始禁用登录按钮
    const loginData: any = {
      metadata: {
        mechanism: 'password_and_code',
      },
      username: data.username,
      password: data.password,
      $code: '',
    }
    UserManager.loginByPassword(
      loginData,
      () => {
      const { data } = this.state
      this.mounted && this.setState({
        isLoginning: false, // 启用登录按钮
        data: {
          ...data
        }
      })
    }, () => {
      this.setState({ isLoginning: false })  // 启用登录按钮
    })
  }

  onReset = () => {}

  /**
   * on form changes
   * @param name
   * @param value
   * @param data
   */
  onChange = (name: string, value: any, data: any) => {

  }

  render() {
    return (
      <Form
        fieldsConf={fieldsConf(this.state.image.src, this.state.isLoginning)}
        dataSource={this.state.data}
        onSubmit={this.onSubmit}
        onReset={this.onReset}
        onChange={this.onChange}
      />
    )
  }
}
