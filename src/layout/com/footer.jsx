// @flow
import * as React from 'react'
import moment from 'moment'

import './footer.scss'

const Footer = () =>
  <footer styleName="footer">
    <strong>@Copyright</strong> {moment().format('YYYY')} All Rights Reserved.
  </footer>

export default Footer