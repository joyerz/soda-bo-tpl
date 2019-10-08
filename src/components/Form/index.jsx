// @flow
import * as React from 'react'
import { Form, Button, Row, Col, Spin } from 'antd'
import memoize from 'memoize-one'

import type { FieldsConfT } from 'src/types/com.form'
import FormValidation from 'src/services/formValidation'
import { simpleClone } from 'utils/objectHelper'
import type { ActionModifyT, VoidFuncT } from 'src/types/actions'
import mobileCheck from 'src/utils/browserDetect'

import Field from './field'
import './index.scss'

const isMobile = mobileCheck()

type Props = {
  spinning?: boolean,
  inline: boolean,
  onChangeValidate: boolean, // onchange是否要验证
  fieldsConf: Array<FieldsConfT>, // 表单配置
  theme: string, // 样式
  dataSource: {}, // 数据
  onSubmit?: ActionModifyT, // 提交方法
  onReset?: VoidFuncT, // 重置方法
  onChange?: (name: string, value: string | number, data: {}) => void, // onChange
  collSpanAutoAdapt: boolean,   // 自动根据isMobile修改coll组件的span参数为24沾满正行 默认true
}

type State = {
  data: {},
  validation: {},
  changed: boolean,
}

export default class index extends React.Component<Props, State> {
  static defaultProps = {
    spinning: false,
    inline: true,
    onChangeValidate: true,
    theme: '',
    dataSource: {},
    collSpanAutoAdapt: true,
  }

  state = {
    data: {},
    validation: {},
    changed: false,
  }

  dataSourceChanged = false // props.data变更标记
  mounted = false

  componentWillUnmount() {
    this.mounted = false
  }

  componentDidMount() {
    this.mounted = true
  }

  /* 判断所传参数是否相同 */
  detectDataSourceChanged = memoize(
    (dataSource: {}): boolean => {
      this.dataSourceChanged = true
      return this.dataSourceChanged
    },
  )

  /**
   * 将配置项转变成数据结构  执行多次
   * @param fields
   */
  convertDataFromFields = memoize((fieldsConf: Array<any>, dataSource: {}) => {
    const data = {}
    const validation = {}
    fieldsConf.map(row => {
      if (row.type !== 'button') {
        row.fields.map(item => {
          if (
            item.display &&
            item.field !== 'button' &&
            item.field !== 'render'
          ) {
            // 如果数据源(props)发生改变，取数据源，否则取本地(state)
            const value = data[item.key] = this.dataSourceChanged
              ? dataSource[item.key]
              : this.state.data[item.key]

            // 如果数据源(props)发生改变： 如果有值，重新校验；没有值，不校验
            const initValidation = this.getValidationConf(item.key, value, item.rules)
            validation[item.key] = {
              ...initValidation,
              rules: item.rules,
              validator: item.validator
            }
          }
        })
      }
    })
    this.dataSourceChanged = false
    setTimeout(() => this.mounted && this.setState({ data, validation }), 0)
    return data
  })

  getValidationConf = (key: string, value: any, rules: Array<string>) => {
    const { validation } = this.state
    if (validation[key] !== undefined && value !== undefined) {
      return FormValidation.check(value, rules)
    }
    return { validated: true, msg: '' }
  }

  validate = () => {
    const { fieldsConf } = this.props
    const { data, validation } = this.state
    let validated = true
    fieldsConf.map(row => {
      if (row.type !== 'button') {
        row.fields.map(item => {
          if (
            item.display &&
            item.field !== 'button' &&
            item.field !== 'render'
          ) {
            const result =  FormValidation.check(data[item.key], item.rules)
            validation[item.key] = {
              ...result,
              rules: item.rules
            }

            if (validation[item.key].validated && validation[item.key].validator) {
              validation[item.key] = Object.assign(validation[item.key], validation[item.key].validator(data[item.key], this.getFieldValue))
            }

            if (!validation[item.key].validated) {
              validated = false
            }
          }
        })
      }
    })

    this.setState({ validation })
    return validated
  }

  onSubmit = (e?: Event) => {
    e && e.preventDefault && e.preventDefault()
    if (!this.validate()) return false
    const {onSubmit} = this.props
    onSubmit && onSubmit(simpleClone(this.state.data))
  }

  onButtonClick = (key: string, onClick: any): void => {
    if (key === 'submit') {
      this.onSubmit()
    } else if (key === 'reset') {
      const { onReset } = this.props
      onReset && onReset()
    }

    if (onClick && typeof onClick === 'function') {
      onClick()
    }
  }

  getFieldValue = (key: string) => this.state.data[key]

  onChange = (name: string, value: any) => {
    const { data, validation } = this.state
    // console.log(validation)
    data[name] = value
    if (this.props.onChangeValidate && validation[name]) {
      let result = FormValidation.check(value, validation[name].rules)
      if (result.validated && validation[name].validator) {
        result = validation[name].validator(value, this.getFieldValue)
      }
      validation[name] = Object.assign({}, validation[name], result)
    }
    this.setState({ data, validation, changed: true })

    this.props.onChange && this.props.onChange(name, value, data)
  }

  /**
   * call render function
   */
  renderChild = (item: any, idx: number, dataSource: any): React.Node => {
    const { type, onClick, key, label, render, display, ...rest } = item
    // console.log(render, render(fieldsData))
    // console.log(dataSource)
    return typeof render === 'function' ? render(dataSource) : <span />
  }

  renderButton = (item: any, idx: number) => {
    const { type, onClick, key, label, display = true, ...rest } = item
    return display
      ? (
        <span key={idx}>
          {idx > 0 && <span>&nbsp; &nbsp;</span>}
          <Button
            {...rest}
            type={type || ''}
            onClick={() => this.onButtonClick(key, onClick)}
          >
            {label}
          </Button>
        </span>
      )
      : null
  }

  renderAddOn = (addon: any): React.Node =>
    typeof addon === 'function' ? addon() : addon

  render() {
    const { validation } = this.state
    let { fieldsConf, dataSource, inline, theme, collSpanAutoAdapt } = this.props
    this.detectDataSourceChanged(dataSource) // 检测prop dataSource是否发生变化，取值相关
    const fieldsData = this.convertDataFromFields(fieldsConf, dataSource) // 从fields配置里取得数据结构
    let styleName = inline ? 'field-inline ' : ' '
    styleName += theme
    return (
      <Spin spinning={this.props.spinning}>
        <div styleName={styleName}>
          <Form onSubmit={this.onSubmit}>
            {fieldsConf.map((row, idx) =>
              row.type !== 'button' ? (
                <Row key={idx} gutter={row.gutter || 16} style={row.style || {}}>
                  {row.fields.map(item => {
                    const { display, addon, responsive, validator, rules=[], ...others } = item
                    const res = responsive || {}
                    if (display) {
                      let wrapper = (Component: any): any => Component
                      if (item.wrapper) wrapper = item.wrapper

                      return (
                        <Col
                          span={(collSpanAutoAdapt && isMobile) ? 24 : (item.span || row.span || 8)}
                          {...res}
                          offset={item.offset || null}
                          key={item.key}
                        >

                          {item.field === 'button' && (
                            <Form.Item>
                              {this.renderButton(item, 0)}
                              {this.renderAddOn(addon)}
                            </Form.Item>
                          )}

                          {item.field === 'render' && (
                            <Form.Item
                              label={item.label}
                              required={item.rules && item.rules.indexOf('required') !== -1}
                            >
                              {this.renderChild(item, idx, dataSource)}
                              {this.renderAddOn(addon)}
                            </Form.Item>
                          )}

                          {!item.field && wrapper(
                            <Form.Item
                              required={
                                validation[item.key] &&
                                validation[item.key].rules.indexOf('required') !==
                                -1
                              }
                              label={item.label}
                              validateStatus={
                                validation[item.key] &&
                                !validation[item.key].validated
                                  ? 'error'
                                  : ''
                              }
                              help={
                                validation[item.key] &&
                                !validation[item.key].validated
                                  ? validation[item.key].msg
                                  : ''
                              }
                              labelCol={{span: 20, offset: 0}}
                            >
                              <Field
                                {...others}
                                key={item.key}
                                name={item.key}
                                value={fieldsData[item.key]}
                                onChange={this.onChange}
                              />
                              {this.renderAddOn(addon)}
                            </Form.Item>
                          )}
                        </Col>
                      )
                    }
                  })}
                </Row>
              ) : (
                <div
                  styleName="button-container"
                  key={idx}
                  style={Object.assign(
                    { textAlign: row.align || 'left' },
                    row.wrapperStyle || {},
                  )}
                >
                  {row.fields.map((item, idx) => {
                    return this.renderButton(item, idx)
                  })}
                </div>
              ),
            )}
          </Form>
        </div>
      </Spin>
    )
  }
}
