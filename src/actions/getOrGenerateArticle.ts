'use server'

import getArticleRecord from "@/actions/getArticleRecord";
import generateArticle from "@/actions/generateArticle";

const getOrGenerateArticle = async (words: string[]) => {
    const articleRecord = await getArticleRecord()

    if (articleRecord) {
        return articleRecord.article
    } else {
        return await generateArticle(words)
    }
}

export default getOrGenerateArticle