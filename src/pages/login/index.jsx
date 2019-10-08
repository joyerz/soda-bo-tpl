// @flow
import * as React from 'react'
import { connect } from 'react-redux-creator'
import type { ActionModifyT, VoidFuncT } from 'src/types/actions'
import { pathInfo } from 'utils/url'
import UserManager from 'src/services/userManager'
import Login from './com/login'
import SetPassword from './com/setPassword'
import Forgot from './com/forgot'

import { sendCodeRedux } from './redux'
import './index.scss'
import logoText from '../../assets/images/logo.png'

type Props = {
  actionSendCode: ActionModifyT,
  actionSendCodeReset: VoidFuncT,
  sendCode: any,
}

class Index extends React.PureComponent<Props> {
  componentDidMount() {
    this.props.actionSendCode()
    if (UserManager.isLogin()) {
      UserManager.isSetPassword()
    }
  }

  render() {
    return (
      <div styleName="container">
        <div styleName="wrapper">
          <div styleName="logo">
            <img src={logoText} />
          </div>
          <div styleName="frame">
            { /* 登录 code or password */
              ( pathInfo().first === 'login' || pathInfo().first === 'login-staff') &&
              <Login
                sendCode={this.props.sendCode}
                actionSendCode={this.props.actionSendCode}
                actionSendCodeReset={this.props.actionSendCodeReset}
              />
            }

            { /* 忘记密码 */
              (pathInfo().first === 'forgot' || pathInfo().first === 'forgot-staff') &&
              <Forgot
                data={this.props.sendCode}
                actionSendCode={this.props.actionSendCode}
                actionSendCodeReset={this.props.actionSendCodeReset}
              />
            }

            <div styleName="copyright">
              Powered by Soda Mobility
            </div>
          </div>
        </div>

        { /* 如果是首次登录，弹出设置密码 */
          (pathInfo().first === 'set-password') &&
          <SetPassword />
        }
      </div>
    )
  }
}

export default connect(
  state => ({
    sendCode: state.sendCode,
  }),
  {
    actionSendCode: (data) => sendCodeRedux.start(data), // send code
    actionSendCodeReset: () => sendCodeRedux.reset(), // reset send code status
  }
)(Index)
