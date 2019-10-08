// @flow
import * as React from 'react'
import { goc } from 'utils/objectHelper'
import { GENDER } from 'conf/enum'

type Props = {
  value: string | null
}

const index = (props: Props) => {
  let { value } = props
  value = value ? value.toUpperCase() : 'M'
  return (
    <span>{goc(GENDER, value)}</span>
  )
}

export default index
