'use client'

import toParagraphs from "@/components/toParagraphs";
import SpeechButton from "@/components/SpeechButton";
import getOrGenerateSentences from "@/app/actions/getOrGenerateSentences";
import {useEffect, useState} from "react";
import RegenerateButton from "@/components/RegenerateButton";
import Loading from "@/app/loading";

const SentencesResult = ({words}: {words: string[]}) => {
    const [sentences, setSentences] = useState<string>("")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const firstLoad = async () => {
            setSentences(await getOrGenerateSentences(words))
            setIsLoading(false)
        }

        firstLoad().catch()
    },[words])

    return (
        <div className={"relative flex-col min-h-20 z-0"}>
            {isLoading ? <Loading/> : (
                <>
                    <div className={"absolute gap-0.8 right-0 top-[-6.6rem]"}>
                        <RegenerateButton
                            words={words}
                            className={""}
                            type={"sentences"}
                            setContents={setSentences}
                            setIsLoading={setIsLoading}/>
                        <SpeechButton
                            className={""} sentences={sentences}/>
                    </div>
                    {toParagraphs(sentences)}
                </>
            )}
        </div>
    )
}

export default SentencesResult