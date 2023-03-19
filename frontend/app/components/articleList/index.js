import { dateFormat2ui } from "@/utils"
import Link from "next/link"
import styles from "./index.module.css"
import { post } from "@/utils/request"

export async function fetchArticleList(page=1, pageSize=30) {
  return await post("/article/list", { page, pageSize })
}

const ArticleList = async props => {
  const articleListRes = await fetchArticleList(props.page)
  const { currentPage, list: articleList, totalPage } = articleListRes

  return (
    <div>
      {
        articleList.map(articleObj => {
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
      <div className={styles.paginationWrapper}>
        {
          currentPage > 1 ? (
            <Link href={`/writing/${currentPage-1}`}>
              <svg t="1679217455125" class={`${styles.picon} ${styles.r15}`} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2779" width="64" height="64">
                <path d="M238.208798 504.759085c114.078175 125.190257 330.334497 341.639984 441.040878 454.927143L785.790178 856.32207c-36.308951-36.902468-343.031681-348.783685-344.618828-358.506117 62.496379-64.083527 246.805082-251.967662 324.579423-339.65784l-95.228875-93.844342L238.208798 504.759085z" fill="#272636" p-id="2780"></path>
              </svg>
            </Link>
            ) : null
        }
        Page {currentPage} of {totalPage}
        {
          currentPage < totalPage ? (
            <Link href={`/writing/${currentPage+1}`}>
              <svg t="1679217455125" class={`${styles.picon} ${styles.rpicon} ${styles.l15}`} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2779" width="64" height="64">
                <path d="M238.208798 504.759085c114.078175 125.190257 330.334497 341.639984 441.040878 454.927143L785.790178 856.32207c-36.308951-36.902468-343.031681-348.783685-344.618828-358.506117 62.496379-64.083527 246.805082-251.967662 324.579423-339.65784l-95.228875-93.844342L238.208798 504.759085z" fill="#272636" p-id="2780"></path>
              </svg>
            </Link>
          ) : null
        }
      </div>
    </div>
  )
}

export default ArticleList