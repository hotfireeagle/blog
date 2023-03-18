"use client"
import { useLayoutEffect } from "react"

const Highlight = () => {
  useLayoutEffect(() => {
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
  }, [])
}

export default Highlight