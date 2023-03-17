import styles from "./index.module.css"
import { get } from "@/utils/request"

async function fetchArticleDetail(articleId) {
  return await get(`/article/detail/${articleId}`)
}

export default async function Detail(props) {
  const { articleId } = props.params
  const articleDetail = await fetchArticleDetail(articleId)

  /**
   * 加载代码高亮库 TODO:
   * @returns 
   */
  const fetchHighlightResource = () => {
    return new Promise((resolve, reject) => {
      const scriptDom = document.createElement("script")
      scriptDom.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"
      const linkDom = document.createElement("link")
      linkDom.rel = "stylesheet"
      linkDom.href = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/agate.min.css"
      scriptDom.onload = function() {
        resolve()
      }
      scriptDom.onerror = scriptDom.onabort = reject
      document.body.appendChild(scriptDom)
      document.head.appendChild(linkDom)
    })
  }

  /**
   * dom就绪 且 三方库加载完毕时，调用三方库使dom高亮
   */
  // Promise.all([fetchDetailPromise(), fetchHighlightResource()]).then(() => {
  //   hljs.highlightAll()
  // })

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.titelCls}>{articleDetail.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: articleDetail.content }} />
    </div>
  )
}