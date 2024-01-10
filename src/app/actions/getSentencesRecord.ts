'use server'

import prisma from "@/app/actions/db";
import { cache } from 'react'

const getSentencesRecord = cache(async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return prisma.sentencesHistory.findFirst({
        where: {
            generated_at: {
                gte: today
            }
        },
        orderBy: {
            generated_at: 'desc', // 最新のものを取得
        },
    });
})

export default getSentencesRecord