import { post } from "@/utils/request"
import { dateFormat2ui } from "@/utils"
import Link from "next/link"
import styles from "./page.module.css"

async function fetchRecommendArticleList() {
  return await post("/article/list", { page: 1, pageSize: 30 })
}

export default async function Home() {
  const articleList = await fetchRecommendArticleList()

  return (
    <div className={styles.pageContainer}>
      {
        articleList.list.map(articleObj => {
          const createDateStr = dateFormat2ui(articleObj.createAt)
          return (
            <div className={styles.articleItem}>
              <span className={styles.dateCls}>{createDateStr}</span>
              <span className={styles.titleCls}>
                <Link href={`/detail/${articleObj.id}`}>{articleObj.title}</Link>
              </span>
            </div>
          )
        })
      }
    </div>
  )
}