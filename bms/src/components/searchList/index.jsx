import { Table, Form, Button } from "antd"
import PropTypes from "prop-types"
import { useState, useEffect } from "react"
import FormItem from "@/components/formItem"
import styles from "./index.less"
import { post } from "@/request"

const SearchList = props => {
  const [formInstance] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [apiRes, setApiRes] = useState({})
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [reload, setReload] = useState(false)

  const fetchListHandler = () => {
    const searchFormData = formInstance.getFieldsValue()
    const postData = {
      ...searchFormData,
      page,
      pageSize,
    }

    setLoading(true)
    let newRes = {}
    post(props.url, postData).then(resData => {
      newRes = resData
    }).finally(() => {
      setApiRes(newRes)
      setLoading(false)
    })
  }

  // 分页器改变的时候触发
  const paginationChangeHandler = (newPage, newPageSize) => {
    let np = newPage
    if (newPageSize !== pageSize) {
      np = 1
    }
    setPage(np)
    setPageSize(newPageSize)
  }

  const reloadHandler = () => {
    formInstance.resetFields()
    setReload(!reload)
  }

  useEffect(() => {
    fetchListHandler()
  }, [page, pageSize, reload])

  return (
    <div>
      <div className={styles.searchContainer}>
        <Form {...props.formConfig} form={formInstance}>
          {/** 生成搜索表单的配置数据 */}
          <FormItem list={props.searchs} />
          <Form.Item>
            <Button onClick={fetchListHandler} type="primary" className={styles.mr15}>搜索</Button>
            <Button onClick={reloadHandler}>重置</Button>
          </Form.Item>
        </Form>
      </div>
      
      <Table
        rowKey="id"
        loading={loading}
        columns={props.columns}
        pagination={{
          current: page,
          pageSize,
          onChange: paginationChangeHandler,
        }}
        dataSource={apiRes?.list || []}
      />
    </div>
  )
}

SearchList.propTypes = {
  url: PropTypes.string, // 列表接口
  columns: PropTypes.array, // 同Table columns
  searchs: PropTypes.array,
  formConfig: PropTypes.object, // 同Form的props配置数据
}

export default SearchList