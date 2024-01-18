'use server'

import prisma from "@/actions/db";

const createWord = async (word: string, phonetic: string = "" ) => {
    return prisma.words.create({
        data: {
            word: word,
            phonetic: phonetic,
        }
    })
}

export default createWord