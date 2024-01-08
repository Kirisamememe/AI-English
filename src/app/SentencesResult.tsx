import toParagraphs from "@/components/toParagraphs";
import SpeechButton from "@/components/SpeechButton";
import getSentences from "@/app/(api)/getSentences";

const SentencesResult = async ({words}: {words: string[]}) => {
    const sentences = await getSentences(words)

    return (
        <div className={"relative flex-col z-0"}>
            <SpeechButton
                className={"absolute right-0 top-[-6.6rem]"} sentences={sentences}/>
            {toParagraphs(sentences)}
        </div>
    )
}

export default SentencesResult