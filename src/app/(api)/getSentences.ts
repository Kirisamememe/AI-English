import prisma from "@/app/(api)/db";
import textOnlyViaGemini from "@/app/(api)/textOnlyViaGemini";

const getSentences = async (words: string[]) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sentencesRecord = await prisma.sentencesHistory.findFirst({
        where: {
            generated_at: {
                gte: today
            }
        },
        orderBy: {
            generated_at: 'desc', // 最新のものを取得
        },
    })

    if (sentencesRecord) {
        return  sentencesRecord.sentences
    } else {
        const prompt = `
                Please create 10 example sentences using the following words. If possible, it would be appreciated if more than two of the provided words could be included in a single sentence.
                Do not output any irrelevant text. Only output the example sentence.
                ${words}`;

        const sentences = await textOnlyViaGemini(prompt)

        await prisma.sentencesHistory.create({
            data: {
                sentences: sentences,
                generated_at: new Date(), // 現在の日時を記録
            },
        });

        return sentences
    }
}

export default getSentences
