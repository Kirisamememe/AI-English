'use server'

import getArticleRecord from "@/app/actions/getArticleRecord";
import generateArticle from "@/app/actions/generateArticle";

const getOrGenerateArticle = async (words: string[]) => {
    const articleRecord = await getArticleRecord()

    if (articleRecord) {
        return articleRecord.article
    } else {
        return await generateArticle(words)
    }
}

export default getOrGenerateArticle