'use server'

import generateSentences from "@/app/(api)/generateSentences";
import getSentencesRecord from "@/app/(api)/getSentencesRecord";

const getOrGenerateSentences = async (words: string[]) => {
    const sentencesRecord = await getSentencesRecord()

    if (sentencesRecord) {
        return sentencesRecord.sentences
    } else {
        return await generateSentences(words)
    }
}

export default getOrGenerateSentences
