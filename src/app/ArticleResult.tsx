import toParagraphs from "@/components/toParagraphs";
import getArticle from "@/app/(api)/getArticle";

const ArticleResult = async ({words}: {words: string[]}) => {

    const article = await getArticle(words)

    return (
        <div className={"flex-col"}>
            {toParagraphs(article)}
        </div>
    )
}

export default ArticleResult