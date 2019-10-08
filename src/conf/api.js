const api = '/api' // api point

export const API = {
  login: {
    sendCode: api + '/users/verification-codes',
    byPassword: api + '/auth',
    loginCodeNeed: api + '/verification'
  },
}

export default {}
