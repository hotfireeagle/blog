import Link from "next/link"
import styles from "./index.module.css"

export default function Header() {
  return (
    <div className={styles.headerWrapper}>
      <Link href="/">
        Smallhai's Blog
      </Link>
    </div>
  )
}