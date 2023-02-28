import { createSignal, For } from "solid-js"
import { A } from "@solidjs/router"
import { post } from "@/utils/request"
import { dateFormat2ui } from "@/utils"
import styles from "./index.module.css"

export default function Index() {
  const [articleListRes, setArticleListRes] = createSignal({})

  post("/article/list", { page: 1, pageSize: 10 }).then(data => {
    setArticleListRes(data)
  })

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
    </div>
  )
}