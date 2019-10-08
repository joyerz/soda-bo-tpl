import * as React from 'react'

import { Route, Switch } from 'react-router' // react-router v4/v5
// import { LocaleProvider } from 'antd'
// import zh_CN from 'antd/lib/locale-provider/zh_CN'

import { pathInfo } from 'utils/url'
import UserManager from 'src/services/userManager'
import menuConfig from 'conf/menu'
import Login from 'pages/login'
import Layout from '../layout'

// {{__IMPORT_REDUX_START__}}
import 'pages/login/redux'

 // {{__IMPORT_REDUX_END}}

/**
 * Generate Component with arguments [params]
 * @return {Function}
 */
type RouteChild = {
  path: string,
  component: any
}

class ListRouters extends React.Component<{}> {
  mounted = false

  componentWillUnmount(): void {
    this.mounted = false
  }

  componentDidMount(): void {
    this.mounted = true
    // 用户登录以后
    UserManager.userInfoDidFetch(() => {
      this.mounted && this.setState({})
    })
  }

  render() {
    /*let routes = []
     const menu = menuConfig
     menu.forEach(item => {
     item.path.map((pathChild: string) => {
     routes.push(
     <Route
     exact
     key={pathChild}
     path={pathChild}
     render={() => <item.component type={pathInfo().second || 'list'} />}
     />
     )
     })
     })
     return routes*/

    let routes = []
    for (let group of menuConfig) {
      group.subMenu.map(item =>
        item.path.map((pathChild: string) => {
          UserManager.isPermission(item.permission) &&
          routes.push(
            <Route
              exact
              key={pathChild}
              path={pathChild}
              render={() => <item.component type={pathInfo().second || 'list'} />}
            />,
          )
        }),
      )
    }
    return routes
  }

}

const NotFound = () => (
  <div className="content404">
    <h1>朗仁智能锁管理系统</h1>
    <h3>Qiyu Back Office</h3>
  </div>
)

const routes = (): React.Node => {
  return (
      <Layout>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgot" component={Login} />
          <ListRouters />
          <Route render={() => <NotFound />} />
        </Switch>
      </Layout>
  )
}
export default routes
