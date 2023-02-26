import styles from "./index.less"
import { Form, Input, Button } from "antd"
import { post } from "@/request"
import { tokenStore } from "@/utils/localStorage"
import { history } from "@umijs/max"

const Login = () => {
  const [formInstance] = Form.useForm()

  const loginHandler = async () => {
    const postData = await formInstance.validateFields()
    return post("/user/login", postData).then(res => {
      tokenStore.set(res)
      history.push("/")
    })
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.mb100}>
        <div className={styles.titleCls}>博客后台</div>
        <Form form={formInstance} layout="vertical">
          <Form.Item name="email" label="邮箱" required>
            <Input
              className={styles.w300}
              placeholder="请输入邮箱"
            />
          </Form.Item>
          <Form.Item name="password" label="密码" required>
            <Input
              className={styles.w300}
              type="password"
              placeholder="请输入密码"
            />
          </Form.Item>
          <Form.Item>
            <Button
              onClick={loginHandler}
              type="primary"
              className={styles.w300}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login