import prisma from "@/app/(api)/db";
import textOnlyViaGemini from "@/app/(api)/textOnlyViaGemini";

const getArticle = async (words: string[]) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const articleRecord = await prisma.articleHistory.findFirst({
        where: {
            generated_at: {
                gte: today
            }
        },
        orderBy: {
            generated_at: 'desc', // 最新のものを取得
        },
    })

    if (articleRecord) {
        return articleRecord.article
    } else {
        const prompt = `
                Please write an interesting story in 150 words or less using all the following words.
                Do not output any irrelevant text. Only output the story.
                ${words}`

        const article = await textOnlyViaGemini(prompt)

        await prisma.articleHistory.create({
            data: {
                article: article,
                generated_at: new Date(), // 現在の日時を記録
            },
        });

        return article
    }
}

export default getArticle