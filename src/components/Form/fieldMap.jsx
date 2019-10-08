// @flow
import * as React from 'react'
import {
  Input,
  AutoComplete,
  Select,
  InputNumber,
  Radio,
  Checkbox,
  DatePicker,
  Upload,
  Icon,
  TimePicker,
  Row,
  message,
  Col,
  Cascader
} from 'antd'
import {
  getItemLabelByValue,
  getItemLabelsByValue,
  simpleClone,
} from 'utils/objectHelper'
import UserManager from 'src/services/userManager'
import moment from 'moment'
import TimeLabel from 'com/TimeLabel'

import './index.scss'

/**
 * select
 */
const { Option } = Select
export const SelectField = (props: any) => {
  const {
    items,
    value,
    readOnly,
    optionFilterProp = 'label',
    showSearch = true,
    ...p
  } = props
  return readOnly ? (
    getItemLabelByValue(items, value)
  ) : (
    <Select
      placeholder="请选择"
      {...p}
      value={value}
      optionFilterProp={optionFilterProp}
      showSearch={showSearch}
      allowClear
    >
      {items.map((item, idx) => (
        <Option key={idx} value={item.value} label={item.label}>
          {item.label}
        </Option>
      ))}
    </Select>
  )
}

/**
 * radio
 */
const RadioField = (props: any) => {
  const { items, value, readOnly, ...p } = props
  return readOnly ? (
    getItemLabelByValue(items, value)
  ) : (
    <Radio.Group {...p} options={items} value={value} />
  )
}

/**
 * checkbox field
 */
class CheckboxField extends React.PureComponent<any> {
  isCheckedAll = (value: ?Array<any>, items: Array<any>) => {
    return value && value.length === items.length
  }

  onCheckAllChange = (e: any) => {
    const updateValue = []
    if (e.target.checked) {
      this.props.items.forEach(item => updateValue.push(item.value))
    }
    this.props.onChange(updateValue)
  }

  render() {
    const { items, value, readOnly, checkAll, ...p } = this.props

    return readOnly ? (
      getItemLabelsByValue(items, value)
    ) : (
      <>
        {checkAll && (
          <Checkbox
            checked={this.isCheckedAll(value, items)}
            onChange={this.onCheckAllChange}
          >
            全选 &nbsp;
          </Checkbox>
        )}
        <Checkbox.Group {...p} options={items} value={value} />
      </>
    )
  }
}

/**
 * TimePicker
 */
const TimePickerField = (props: any) => {
  let { value, ...rest } = props
  const format = 'HH:mm'
  if (value !== undefined && value !== null && value) {
    value = moment(simpleClone(value), format)
  }
  return <TimePicker {...rest} value={value} format={format} />
}

/**
 * Time Range Picker
 */
type TimeRangePickerFieldProps = {
  value: any,
  key: string,
  onChange: (value: any) => void,
  readOnly: boolean,
}

class TimeRangePickerField extends React.PureComponent<TimeRangePickerFieldProps> {
  format = 'HH:mm'

  onChange = (index: number, ...arg: any) => {
    let value = this.convertValue()
    value[index] = arg[0]
    this.props.onChange(value)
  }

  convertValue = () => {
    let { value } = this.props
    if (value instanceof Array && value.length > 0) {
      value = simpleClone(value)
      if (value[0]) value[0] = moment(value[0], this.format)
      if (value[1]) value[1] = moment(value[1], this.format)
    } else {
      value = [undefined, undefined]
    }
    return value
  }

  render() {
    let { value, key, onChange, readOnly, ...rest } = this.props
    const editValue = this.convertValue()

    return readOnly ? (
      value && value.length > 0 ? (
        <>
          {value[0]}
          <span className="marginL6 marginR6">~</span>
          {value[1]}
        </>
      ) : (
        ''
      )
    ) : (
      <div styleName="time-range">
        <div styleName="time-range-picker">
          <TimePicker
            key={key + '1'}
            {...rest}
            value={editValue[0]}
            format={this.format}
            onChange={(...arg) => this.onChange(0, ...arg)}
          />
        </div>
        <div styleName="divider">~</div>
        <div styleName="time-range-picker">
          <TimePicker
            key={key + '2'}
            {...rest}
            value={editValue[1]}
            format={this.format}
            onChange={(...arg) => this.onChange(1, ...arg)}
          />
        </div>
      </div>
    )
  }
}

/**
 * Input
 */
const InputField = (props: any) => {
  return <Input placeholder="请输入" {...props} autoComplete="off" />
}

/**
 * Password
 */
const PasswordField = (props: any) => {
  return <Input {...props} type="password" />
}
/**
 * datepicker
 */
const DatePickerField = (props: any) => {
  let { value, ...rest } = props
  if (value !== undefined && value !== null && value) {
    value = moment(simpleClone(value))
  }
  return <DatePicker {...rest} value={value} />
}

/**
 * RangePkcer
 */
const RangePickerField = (props: any) => {
  let { value, readOnly, format, ...rest } = props
  if (value && value.constructor.name === 'Array' && value.length > 0) {
    value = simpleClone(value)
    value[0] = moment(value[0])
    value[1] = moment(value[1])
  } else {
    value = [null, null]
  }
  return readOnly ? (
    <>
      <TimeLabel type={format} value={value[0]} /> ~{' '}
      <TimeLabel type={format} value={value[1]} />
    </>
  ) : (
    <DatePicker.RangePicker {...rest} value={value} />
  )
}

/**
 * Upload
 * @type {XML}
 */
const uploadButton = (
  <div>
    <Icon type="plus" />
    <div className="ant-upload-text">上传</div>
  </div>
)

type UploadFieldProps = {
  value?: Array<any>,
  name: string,
  blobName: string,
  readOnly?: boolean,
  maxFiles: number,
  maxFileSize: number,
  fileType: string, // 上传文件类型  img / other
  showErrorMessage: boolean,
  onChange: any => void,
  onUploaded?: any => void,
  getResponseData?: any => void, // 获取返回的数据
}

class UploadField extends React.PureComponent<UploadFieldProps> {
  static defaultProps = {
    maxFiles: 5, // 最多能上传文件数
    maxFileSize: 20, //最大上传体积
    fileType: 'img', // 默认上传图片
  }

  beforeUpload = (file: any, type: string) => {
    const { maxFileSize } = this.props
    const fileSizeLarger= file.size / 1024 / 1024 > maxFileSize
    if (fileSizeLarger) {
      message.error(`文件体积大小不超过${maxFileSize}M`)
      return false
    }

    if (type === 'img') {
      const isJPG = file.type
      if ((isJPG === 'image/jpeg' || isJPG === 'image/png')) {
        return true
      } else {
        message.error('仅支持上传jpg格式图片')
        return false
      }
    }
  }

  onChange = (info: any, showErrorMessage: boolean): void => {
    let fileList = [...info.fileList]

    fileList = fileList.map((file, idx) => {
      if (file.response) {
        file.url = file.response.url
        file.name = file.response.filename
      }
      return file
    })

    // console.log(fileList)
    this.props.onChange(fileList)
    if (this.props.onUploaded) {
      this.props.onUploaded(fileList)
    }

    if (info.file.status === 'done') {
      this.props.getResponseData &&
        this.props.getResponseData(info.file.response)
    } else if (info.file.status === 'error' && showErrorMessage) {
      message.error(info.file.response.invoice.message)
    }
  }

  render() {
    let {
      value,
      readOnly,
      maxFiles,
      blobName,
      fileType,
      showErrorMessage,
      ...rest
    } = this.props
    value = value || []

    const blob = blobName || 'blob'

    return (
      <>
        <Upload
          {...rest}
          key={blob}
          name={blob}
          headers={{ Authorization: UserManager.getRequestHeader() }}
          listType="picture-card"
          fileList={value}
          showUploadList={true}
          onChange={file => this.onChange(file, showErrorMessage)}
          beforeUpload={file => this.beforeUpload(file, fileType)}
          disabled={readOnly}
        >
          {(value.length >= maxFiles || readOnly) ? null : uploadButton}
        </Upload>
      </>
    )
  }
}

/**
 * cascader
 */
export const CascaderField = (props: any) => {
  const { readOnly, options, value } = props
  if (!readOnly) {
    return <Cascader {...props} />
  } else {
    return getCascaderLabel(value, options, 0, [])
  }
}
function getCascaderLabel (originalValue, curOptions, valueIndex, labelArr){

  if (valueIndex < originalValue.length) {
    let temp = curOptions.find(item => item.value === originalValue[valueIndex])
    if (temp) {
      labelArr.push(temp.label)
    }
    if (temp && temp.children) {
      valueIndex++
      return getCascaderLabel(originalValue, temp.children, valueIndex, labelArr)
    } else {
      return labelArr.join(' / ')
    }
  } else {
    return labelArr.join(' / ')
  }
}

const FieldMap = {
  autoComplete: AutoComplete,
  input: InputField,
  inputPassword: PasswordField,
  select: SelectField,
  inputNumber: InputNumber,
  textarea: Input.TextArea,
  radio: RadioField,
  checkbox: CheckboxField,
  datepicker: DatePickerField,
  rangepicker: RangePickerField,
  upload: UploadField,
  timepicker: TimePickerField,
  timerange: TimeRangePickerField,
  cascader: CascaderField
}

export default FieldMap
