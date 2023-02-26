import { Card } from "antd"
import SearchList from "@/components/searchList"

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

  return (
    <Card>
      <SearchList
        url="/article/list"
        columns={columnList}
        searchs={searchSchemaList}
        formConfig={{ layout: "inline" }}
      />
    </Card>
  )
}

export default ArticleList