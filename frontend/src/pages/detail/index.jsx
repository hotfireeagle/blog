import styles from "./index.module.css"
import { get } from "@/utils/request"
import { useParams } from "@solidjs/router"
import { createSignal } from "solid-js"

export default function Detail() {
  const paramsObj = useParams()
  const [articleDetail, setArticleDetail] = createSignal({})

  /**
   * 加载文章详情数据
   * @returns 
   */
  const fetchDetailPromise = () => {
    return get(`/article/detail/${paramsObj.id}`).then(result => {
      setArticleDetail(result)
    })
  }

  /**
   * 加载代码高亮库
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
  Promise.all([fetchDetailPromise(), fetchHighlightResource()]).then(() => {
    hljs.highlightAll()
  })

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.titelCls}>{articleDetail().title}</h2>
      <div innerHTML={articleDetail().content} />
    </div>
  )
}