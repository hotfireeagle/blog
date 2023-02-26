import { Card, Button } from "antd"
import SearchList from "@/components/searchList"
import { history } from "@umijs/max"

const ArticleList = () => {
  const columnList = [
    {
      title: "文章标题",
      dataIndex: "title",
    },
    {
      title: "创建时间",
      dataIndex: "createAt",
    },
    {
      title: "更新时间",
      dataIndex: "updateAt",
    },
    {
      title: "操作",
      dataIndex: "id",
      render: () => {
        return <a href="#">查看</a>
      }
    }
  ]

  const searchSchemaList = [
    {
      type: "input",
      label: "文章标题",
      name: "title",
    }
  ]

  const newHandler = () => {
    history.push("/articleModule/add")
  }

  return (
    <Card>
      <SearchList
        url="/article/list"
        columns={columnList}
        searchs={searchSchemaList}
        formConfig={{ layout: "inline" }}
      >
        <Button onClick={newHandler} type="primary">新增文章</Button>
      </SearchList>
    </Card>
  )
}

export default ArticleList