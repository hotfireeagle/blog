import { Card, Table } from "antd"
import { get } from "@/request"
import { useState, useEffect } from "react"
import SearchList from "@/components/searchList"

const ArticleList = () => {
  const columnList = [
    {
      title: "文章标题",
      dataIndex: "title",
    },
    {
      title: "创建时间",
      dataIndex: "title",
    },
    {
      title: "更新时间",
      dataIndex: "title",
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
      key: "TODO:",
    }
  ]

  return (
    <Card>
      <SearchList
        columns={columnList}
        searchs={searchSchemaList}
        formConfig={{ layout: "inline" }}
      />
    </Card>
  )
}

export default ArticleList