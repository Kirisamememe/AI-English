'use server'

import prisma from './db'

const getVocabList = async (currentPage: number, itemsPerPage: number) => {
    return prisma.words.findMany({
        skip: (currentPage - 1) * itemsPerPage, // 現在のページに応じてスキップするアイテム数を計算
        take: itemsPerPage,                    // 1ページあたりのアイテム数
        orderBy: {
            word_id: 'asc', // または 'desc'
        },
        include: {
            meanings: {
                include: {
                    definitions: true,
                },
            },
        },
    })
}

export default getVocabList