import { Routes, Route } from "@solidjs/router"
import Index from "./pages/index"
import Detail from "./pages/detail"
import Header from "./components/header"
import styles from "./app.module.css"

export default function App() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerCls}>
        <Header />
      </div>
      <div className={styles.bodyCls}>
        <Routes>
          <Route path="/detail" component={Detail} />
          <Route path="/" component={Index} />
        </Routes>
      </div>
    </div>
  )
}