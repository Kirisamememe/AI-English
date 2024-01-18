'use server'

import prisma from "@/actions/db";

interface WordData {
    word: string
    phonetic: string
    meanings: Meaning[]
}

export interface Meaning {
    partOfSpeech: string
    synonyms: string | null
    antonyms: string | null
    definitions: {
        definition: string
        example: string | null
    }[]
}

const insertWordData = async (wordId: number, wordData: WordData) => {
    try {
        console.log(`\n\n＝＝＝＝＝＝${wordData.word} の挿入を開始します。＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝\n\n`)

        // const wordData = await fetchWordData(word)
        //
        // if (wordData.length > 1) {
        //     const newMeanings: Meaning[] = [];
        //
        //     wordData.forEach((data: Word) => data.meanings.map(meaning => newMeanings.push(meaning)));
        //     wordData[0].meanings = newMeanings
        // }

        console.log(JSON.stringify(wordData, null, 2));

        await prisma.words.update({
            where: {
              word_id: wordId
            },
            data: {
                phonetic: wordData.phonetic,
                meanings: {
                    create: wordData.meanings.map((meaning: Meaning) => ({
                        partOfSpeech: meaning.partOfSpeech,
                        ...(meaning.synonyms ? {synonyms: meaning.synonyms} : {}),
                        ...(meaning.antonyms ? {antonyms: meaning.antonyms} : {}),
                        definitions: {
                            create: meaning.definitions.map(definition => ({
                                definition: definition.definition,
                                example: definition.example
                            }))
                        }
                    }))
                }
            }
        })


        console.log(`\n\n＝＝＝＝＝＝${wordData.word} の挿入が完了した。＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝\n\n`)
    } catch (error) {
        console.error('Error:', error);
    }
}

export default insertWordData