import ArticleList from "@/components/articleList";

export default async function WritingPage(props) {
  const { pageNo } = props.params

  return <ArticleList page={+pageNo} />
}