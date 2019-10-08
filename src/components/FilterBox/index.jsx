// @flow
import * as React from 'react'
import { Icon, Spin, } from 'antd'
import type { FilterBoxT } from 'src/types/com.filterBox'
import mobileChecker from 'src/utils/browserDetect'

import './index.scss'

const isMobile = mobileChecker()

export default class index extends React.PureComponent<FilterBoxT, { open: boolean }> {
  static defaultProps = {
    open: true,
    extensible: true,
    loading: false,
  }

  constructor(props: FilterBoxT): void {
    super(props)
    this.state = {
      open: props.open,
    }
  }

  toggle = () => this.props.extensible && this.setState({ open: !this.state.open })

  render() {
    const { title, children, extensible, loading, } = this.props

    if (isMobile) {
      return children
    }
    const { open } = this.state

    return (
      <Spin spinning={loading}>
        <div
          className="box"
          style={{ height: open ? 'auto' : 64, overflow: 'hidden' }}
        >
          <div
            className="page-title"
            onClick={this.toggle}
          >
            {title}
            {extensible && <Icon type={open ? 'caret-up' : 'caret-down'} />}
          </div>
          <div styleName="filter-container">
            {children}
          </div>
        </div>
      </Spin>
    )
  }
}
