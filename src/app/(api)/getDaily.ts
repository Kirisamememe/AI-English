'use server'

import prisma from './db'
import {cache} from 'react'

export const getDaily = cache(async () => {

    // const totalCount = await prisma.words.count();

    // console.log(JSON.stringify(wordData, null, 2))

    // const examples:string[] = []
    //
    // wordData.map(word => {
    //     word.meanings.map(meaning => {
    //         meaning.definitions.map(definition => {
    //             if(definition.example) examples.push(definition.example)
    //         })
    //     })
    // })

    return prisma.words.findMany({
        take: 10,
        orderBy: {
            word_id: 'asc', // または 'desc'
        },
        where: {
            word_id: {
                gte: 121, // word_idが101以上
                lte: 130, // そしてword_idが110以下
            },
        },
        include: {
            // 関連するデータを指定
            meanings: {
                include: {
                    definitions: true,
                },
            }
        },
    });
})