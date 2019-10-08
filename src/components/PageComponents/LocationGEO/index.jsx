// @flow
import * as React from 'react'
import type { VoidFuncT } from 'src/types/actions'
import memoize from 'memoize-one'
import type { PosT } from 'src/types/data.base'
import AMapGEO from 'src/services/amapGEO'

type Props = {
  pos: PosT,
  onChange?: VoidFuncT
}

type State = {
  address: string
}

export default class LocationGEO extends React.Component<Props, State> {
  state = {
    address: ''
  }
  mounted = false

  componentWillUnmount(): void {
    this.mounted = false
  }
  componentDidMount(): void {
    this.mounted = true
  }

  setAddress = memoize(
    (latitude: any, longitude: any): boolean => {
      if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude))
        return false
      AMapGEO.getAddressByLocation(longitude, latitude).then(address => {
        // console.log('get', address)
        this.mounted && this.setState({ address })
        this.props.onChange && this.props.onChange()
      })
      return true
    }
  )

  render() {
    const { latitude, longitude } = this.props.pos
    this.setAddress(latitude, longitude)
    return <span>{this.state.address}</span>
  }
}
