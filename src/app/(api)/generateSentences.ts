'use server'

import textOnlyViaGemini from "@/app/(api)/textOnlyViaGemini";
import createNewSentencesRecord from "@/app/(api)/createNewSentencesRecord";

const generateSentences = async (words: string[]) => {
    const prompt = `
                Please create 10 example sentences using the following words. If possible, it would be appreciated if more than two of the provided words could be included in a single sentence.
                Do not output any irrelevant text. Only output the example sentence.
                ${words}`;

    const sentences = await textOnlyViaGemini(prompt)
    await createNewSentencesRecord(sentences)

    return sentences
}

export default generateSentences