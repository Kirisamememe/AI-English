'use server'

import getArticleRecord from "@/app/(api)/getArticleRecord";
import generateArticle from "@/app/(api)/generateArticle";

const getOrGenerateArticle = async (words: string[]) => {
    const articleRecord = await getArticleRecord()

    if (articleRecord) {
        return articleRecord.article
    } else {
        return await generateArticle(words)
    }
}

export default getOrGenerateArticle