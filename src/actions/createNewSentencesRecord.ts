'use server'

import prisma from "@/actions/db";

const createNewSentencesRecord = async (sentences: string) => {
    await prisma.sentencesHistory.create({
        data: {
            sentences: sentences,
            generated_at: new Date(), // 現在の日時を記録
        },
    });
}

export default createNewSentencesRecord