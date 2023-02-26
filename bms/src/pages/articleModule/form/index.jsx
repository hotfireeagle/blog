import { Card, Form, Button, Row, Col, message } from "antd"
import FormItem from "@/components/formItem"
import { post } from "@/request"
import { marked } from "marked"

const ArticleForm = () => {
  const [formInstance] = Form.useForm()

  const configSchema = [
    {
      type: "input",
      label: "文章标题",
      name: "title",
      required: true,
    },
    {
      type: "textArea",
      label: "文章内容",
      name: "content",
      required: true,
    }
  ]

  const saveHandler = async () => {
    const value = await formInstance.validateFields()
    const postData = { ...value }
    postData.content = marked(postData.content)
    return post("/article/new", postData).then(res => {
      message.success("操作成功")
    })
  }

  return (
    <Card title="新增文章">
      <Form
        form={formInstance}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 9 }}
      >
        <FormItem
          list={configSchema}
        />
        <Row>
          <Col offset={3}>
            <Button onClick={saveHandler} type="primary">保存</Button>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}

export default ArticleForm