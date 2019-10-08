import React, { useState } from 'react'
import { Modal } from 'antd'

import './index.scss'

type Props = {
  url: Array<string>,
}


/**
 * 图片预览
 */
export default function PicPreviewer({ url = [] }: Props) {

  let [visible, setVisible] = useState(false)
  let [src, setSrc] = useState('')

  const handleCancel = () => setVisible(false)
  const handleShow = (src) => {
    setVisible(true)
    setSrc(src)
  }

  return <>
    <div styleName='row'>
      {url ? url.filter(item => item).map((item, idx) => <div key={item + '' + idx} styleName='box' onClick={e => handleShow(item)}>
        <img src={item} />
      </div>) : ''}
    </div>

    <Modal visible={visible} footer={null} onCancel={handleCancel}>
      <img alt="previmg" style={{ width: '100%' }} src={src} />
    </Modal>
  </>
}
