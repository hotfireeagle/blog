import { createSignal, For } from "solid-js";
import { post } from "@/utils/request"
import styles from "./index.module.css"

export default function Index() {
  const [articleListRes, setArticleListRes] = createSignal({})

  post("/article/list", { page: 1, pageSize: 10 }).then(data => {
    setArticleListRes(data)
  })

  const renderArticleItem = (articleObj, idx) => {
    const dateObj = new Date(articleObj.createAt)
    let month = dateObj.getMonth()
    if (month < 10) {
      month = "0" + month
    }
    let date = dateObj.getDate()
    if (date < 10) {
      date = "0" + date
    }

    const createDateStr = dateObj.getFullYear() + "/" + month + "/" + date
 
    return (
      <div className={styles.articleItem}>
        <span className={styles.dateCls}>{createDateStr}</span>
        <span className={styles.titleCls}>{articleObj.title}</span>
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