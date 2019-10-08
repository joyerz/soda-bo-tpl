// @flow
import * as React from 'react'
import UserManager from 'src/services/userManager'
import { isReady } from 'utils/common'

import './userInfo.scss'

const avatar = require('assets/images/user/avatar.jpg')

type Props = {}
type State = {
  user: any
}

export default class userInfo extends React.PureComponent<Props, State> {
  mounted = false
  state = { user: null }

  componentWillUnmount(): void {
    this.mounted = false
  }

  componentDidMount(): void {
    this.mounted = true
    isReady(() => !!UserManager.getUserInfo())
      .then(() => this.mounted && this.setState({ user: UserManager.getUserInfo() }))
  }

  render() {
    const { user } = this.state
    return (
      <div styleName="container">
        <div styleName="avatar">
          <img src={avatar} />
        </div>
        <div styleName="user">
          <div styleName="name">{user?.username}</div>
          <div>
            {
              user && user?.role_list && user.role_list.map((item, idx) => (idx > 0 ? ', ' : '') + item.role_name)
            }
          </div>
        </div>
      </div>
    )
  }
}
