import styles from "./index.module.css"
import { get } from "@/utils/request"
import { useParams } from "@solidjs/router"
import { createSignal } from "solid-js"

export default function Detail() {
  const paramsObj = useParams()
  const [articleDetail, setArticleDetail] = createSignal({})

  get(`/article/detail/${paramsObj.id}`).then(result => {
    setArticleDetail(result)
  })

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.titelCls}>{articleDetail().title}</h2>
      <div innerHTML={articleDetail().content} />
    </div>
  )
}