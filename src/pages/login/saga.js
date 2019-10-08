import { put, call, takeLatest, select } from 'redux-saga/effects'
import doFetch from 'utils/fetch'
import { obj2params } from 'utils/objectHelper'
import { API } from 'src/conf/index'
import { messageActionSuccess } from 'utils/messageHelper'

import { sendCodeRedux } from './redux'

/**
 * 发送验证码
 * @param action
 */
export function* sendCode(action) {
  try {
    const { forgotType, ...data } = action.payload.data
    let url = API.login.sendCode + '?' + obj2params({
      channel: 'MOBILE',
      method: 'SMS',
      username:  data.mobile,
      existed: true,
    })
    yield call(doFetch, {
      url,
      method: 'GET',
    })
    yield put(sendCodeRedux.success())
    messageActionSuccess('sendCode')
  } onError (err) {
    yield put(sendCodeRedux.error())
    yield put(sendCodeRedux.reset())
  }
}

export function* watchSendCode() {
  yield takeLatest(sendCodeRedux.types.START, sendCode)
}
