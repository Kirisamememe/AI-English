'use server'

import prisma from "@/actions/db";

const updatePhonetic = async (wordId: number, phonetic: string) => {
    try {
        return prisma.words.update({
            where: {
                word_id: wordId
            },
            data: {
                phonetic: phonetic
            }
        })
    }
    catch (error){
        throw error
    }
}

export default updatePhonetic