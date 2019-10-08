// @flow
import * as React from 'react'
import { Layout, Avatar, Badge } from 'antd'
import UserManager from 'src/services/userManager'
import UserInfo from './userInfo'

import './header.scss'

const { Header } = Layout

type Props = {}

export default class HeaderLayer extends React.PureComponent<Props> {
  render() {
    return (
      <Header className="header">
        <UserInfo />

        <div styleName="info-right">

          <span styleName="logout-icon" onClick={UserManager.logOut}>
            <Avatar icon="logout" />
            &nbsp; 退出
          </span>
        </div>
      </Header>
    )
  }
}
