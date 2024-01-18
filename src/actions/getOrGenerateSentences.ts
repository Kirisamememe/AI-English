'use server'

import generateSentences from "@/actions/generateSentences";
import getSentencesRecord from "@/actions/getSentencesRecord";

const getOrGenerateSentences = async (words: string[]) => {
    const sentencesRecord = await getSentencesRecord()

    if (sentencesRecord) {
        return sentencesRecord.sentences
    } else {
        return await generateSentences(words)
    }
}

export default getOrGenerateSentences
