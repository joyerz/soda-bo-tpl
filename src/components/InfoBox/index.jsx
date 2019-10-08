// @flow
import * as React from 'react'
import { Row, Col } from 'antd'
import mobileChecker from 'src/utils/browserDetect'
import './index.scss'
import Cell from '../Cell'

type Props = {
  title: string,
  subTitle?: string,
  items: Array<ItemT>
}

type ItemT = string | React.Node | () => string | React.Node

const index = (props: any) => {
  const { title, subTitle, items } = props
  const isMobile = mobileChecker()
  return (
    <div styleName="infoBox">
      <div styleName="title">
        {title}
        {subTitle !== undefined && <span styleName="sub-title">{subTitle}</span>}
      </div>
      <div styleName="items">
        {
          !isMobile
            ? <Row gutter={24}>
              {items.map((item: ItemT, idx: number): React.Node => <Col key={idx} span={8}>{typeof item === 'function' ? item() : item}</Col>)}
            </Row>
            : items.map((item: ItemT, idx: number): React.Node => <Cell key={idx}>{typeof item === 'function' ? item() : item}</Cell>)}
      </div>
    </div>
  )
}

export default index
