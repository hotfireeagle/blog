import styles from "./index.module.css"
import { get } from "@/utils/request"
import Highlight from "./highlight"

async function fetchArticleDetail(articleId) {
  return await get(`/article/detail/${articleId}`)
}

export default async function Detail(props) {
  const { articleId } = props.params
  const articleDetail = await fetchArticleDetail(articleId)

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.titelCls}>{articleDetail.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: articleDetail.content }} />
      <Highlight />
    </div>
  )
}