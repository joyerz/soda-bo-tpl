// @flow
import {
  buildRedux,
} from 'react-redux-creator'

export default {}

export const sendCodeRedux = buildRedux('sendCode')({
  onResult: () => console.log('result')
})
