'use server'

import prisma from './db'

const getVocabList = async (currentPage: number, itemsPerPage: number) => {
    return prisma.words.findMany({
        skip: (currentPage - 1) * itemsPerPage, // 現在のページに応じてスキップするアイテム数を計算
        take: itemsPerPage,                    // 1ページあたりのアイテム数
        orderBy: {
            word_id: 'desc', // または 'desc'
        },
        include: {
            meanings: {
                orderBy: {
                    order: 'asc'
                },
                include: {
                    definitions: {
                        orderBy: {
                            order: 'asc'
                        },
                    }
                },
            },
        },
    })
}

export default getVocabList