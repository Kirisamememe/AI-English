'use server'

import prisma from "@/app/(api)/db";

const createNewArticleRecord = async (article: string) => {
    await prisma.articleHistory.create({
        data: {
            article: article,
            generated_at: new Date(), // 現在の日時を記録
        },
    });
}

export default createNewArticleRecord
