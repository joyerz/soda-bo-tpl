// @flow
import * as React from 'react'
import { Icon } from 'antd'

import './index.scss'
import { history } from 'react-redux-creator'

type Props = {
  title: string,
  extra?: Array<React.Node>,
  hasBack?: boolean,    // 显示返回
}

const index = (props: Props = { title: '', extra: [], hasBack: false }):React.Node => (
  <div styleName="page-header">
    <div styleName="mobile-header">
      {props.hasBack && <Icon type="left" onClick={e => history.goBack()} styleName="header-back" />}
      <span>{props.title}</span>
    </div>
    {props.extra && props.extra.length > 0 &&
      <div styleName="page-header-extra">
        {
          (props.extra || []).map((item, i) => {
            return <div key={i} styleName="extra-item">{item}</div>
          })
        }
      </div>
    }yarn
  </div>
)

export default index
