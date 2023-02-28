import styles from "./index.module.css"
import { get } from "@/utils/request"
import { useParams } from "@solidjs/router"
import { createSignal, onMount } from "solid-js"

export default function Detail() {
  const paramsObj = useParams()
  const [articleDetail, setArticleDetail] = createSignal({})

  get(`/article/detail/${paramsObj.id}`).then(result => {
    setArticleDetail(result)
  })

  onMount(() => {
    const scriptDom = document.createElement("script")
    scriptDom.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"
    const linkDom = document.createElement("link")
    linkDom.rel = "stylesheet"
    linkDom.href = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/agate.min.css"
    scriptDom.onload = function() {
      hljs.highlightAll()
    }
    document.body.appendChild(scriptDom)
    document.head.appendChild(linkDom)
  })

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.titelCls}>{articleDetail().title}</h2>
      <div innerHTML={articleDetail().content} />
    </div>
  )
}