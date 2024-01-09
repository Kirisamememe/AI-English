'use server'

import textOnlyViaGemini from "@/app/(api)/textOnlyViaGemini";
import createNewArticleRecord from "@/app/(api)/createNewArticleRecord";

const generateArticle = async (words: string[]) => {
    const prompt = `
                Please write an interesting story in 150 words or less using all the following words.
                Do not output any irrelevant text. Only output the story.
                ${words}`

    const article = await textOnlyViaGemini(prompt)
    await createNewArticleRecord(article)

    return article
}

export default generateArticle