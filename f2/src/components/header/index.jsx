import { A } from "@solidjs/router"
import styles from "./index.module.css"

export default function Header() {
  return (
    <div className={styles.headerWrapper}>
      <A href="/">
        Smallhai's Blog
      </A>
    </div>
  )
}