'use client'

import toParagraphs from "@/components/toParagraphs";
import getOrGenerateArticle from "@/app/(api)/getOrGenerateArticle";
import {useEffect, useState} from "react";
import Loading from "@/app/loading";
import RegenerateButton from "@/components/RegenerateButton";
import SpeechButton from "@/components/SpeechButton";

const ArticleResult = ({words}: {words: string[]}) => {
    const [article, setArticle] = useState<string>("")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const firstLoad = async () => {
            setArticle(await getOrGenerateArticle(words))
            setIsLoading(false)
        }

        firstLoad().catch()
    },[words])

    return (
        <div className={"relative flex-col min-h-20 z-0"}>
            {isLoading ? <Loading/> :
                <>
                    <div className={"absolute gap-0.8 right-0 top-[-6.6rem]"}>
                        <RegenerateButton
                            words={words}
                            className={""}
                            type={"article"}
                            setContents={setArticle}
                            setIsLoading={setIsLoading}/>
                        <SpeechButton
                            className={""} sentences={article}/>
                    </div>
                    {toParagraphs(article)}
                </>}
        </div>
    )
}

export default ArticleResult