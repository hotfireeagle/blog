import styles from "./index.module.css"

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <a href="https://github.com/hotfireeagle" target="_blank">Git</a>
      <span>•</span>
      <a href="https://www.yuque.com/u247852" target="_blank">语雀</a>
      <span>•</span>
      <a href="https://hotfireeagle.github.io/" target="_blank">夜游</a>
      <span>•</span>
      <a href="https://www.jianshu.com/u/30a83f6b8a0f" target="_blank">简书</a>
    </div>
  )
}

export default Footer