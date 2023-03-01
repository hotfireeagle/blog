import { createSignal, For, createEffect } from "solid-js"
import { A } from "@solidjs/router"
import { post } from "@/utils/request"
import { dateFormat2ui } from "@/utils"
import styles from "./index.module.css"

export default function Index() {
  const [articleListRes, setArticleListRes] = createSignal({})
  const [page, setPage] = createSignal(1)

  createEffect(() => {
    post("/article/list", { page: page(), pageSize: 30 }).then(data => {
      setArticleListRes(data)
    })
  })

  const nextOrPrevHandler = base => {
    const cur = page()
    const nextV = cur + base
    if (nextV < 1 || nextV > articleListRes().totalPage) {
      return
    }
    setPage(nextV)
  }

  /**
   * 渲染一行文章内容
   * @param {*} articleObj 
   * @returns 
   */
  const renderArticleItem = articleObj => {
    const createDateStr = dateFormat2ui(articleObj.createAt)
 
    return (
      <div className={styles.articleItem}>
        <span className={styles.dateCls}>{createDateStr}</span>
        <span className={styles.titleCls}>
          <A href={`/detail/${articleObj.id}`}>{articleObj.title}</A>
        </span>
      </div>
    )
  }

  return (
    <div className={styles.pageContainer}>
      <For each={articleListRes().list || []}>
        { renderArticleItem }
      </For>
      <div className={styles.paginationContainer}>
        <span onClick={() => nextOrPrevHandler(-1)} className={styles.lrcls}>&lt&lt</span>
        <span className={styles.mlr4}>{page()}</span>
        <span onClick={() => nextOrPrevHandler(1)} className={styles.lrcls}>&gt&gt</span>
      </div>
    </div>
  )
}