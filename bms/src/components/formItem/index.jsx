import { Form, Input } from "antd"
import PropTypes from "prop-types"
import { useMemo } from "react"

const FormItem = props => {
  const forms = useMemo(() => {
    const arr = props.list || []

    const formItems = []

    arr.forEach(formSchemaObj => {
      const { type } = formSchemaObj
      if (type === "input") {
        formItems.push(
          <Form.Item {...formSchemaObj}>
            <Input />
          </Form.Item>
        )
      }
    })

    return formItems
  }, [props.list])

  return forms
}

FormItem.propTypes = {
  list: PropTypes.array, // 列表的配置数据
}

export default FormItem