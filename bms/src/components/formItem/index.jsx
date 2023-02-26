import { Form, Input } from "antd"
import PropTypes from "prop-types"
import { useMemo } from "react"

const FormItem = props => {
  const forms = useMemo(() => {
    const arr = props.list || []

    const formItems = []

    arr.forEach(formSchemaObj => {
      const { type } = formSchemaObj
      let uiComp = <span>err</span>
      if (type === "input") {
        uiComp = <Input />
      } else if (type === "textArea") {
        uiComp = <Input.TextArea />
      }
      formItems.push(
        <Form.Item {...formSchemaObj} key={formSchemaObj.name}>
          {uiComp}
        </Form.Item>
      )
    })

    return formItems
  }, [props.list])

  return forms
}

FormItem.propTypes = {
  list: PropTypes.array, // 列表的配置数据
}

export default FormItem