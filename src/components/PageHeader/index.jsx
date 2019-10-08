// @flow
import * as React from 'react'
import { PageHeader, Icon, Button } from 'antd'

import './index.scss'

type Props = {}

export default class index extends React.PureComponent<Props> {
  render() {
    return (
      <PageHeader
        className="pageHeader"
        {...this.props}
      />
    )
  }
}
