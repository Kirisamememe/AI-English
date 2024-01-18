import Daily from "@/app/Daily";
import TodayWords from "@/app/TodayWords";
import Sentences from "@/app/Sentences";
import Article from "@/app/Article";
import {getDaily} from "@/actions/getDaily";
import {Suspense} from "react";
import Loading from "@/app/loading";
import TodayWordsResult from "@/app/TodayWordsResult";
import DailyTitle from "@/app/DailyTitle";
import SentencesResult from "@/app/SentencesResult";
import ArticleResult from "@/app/ArticleResult";

export default async function Home() {
    const wordData = await getDaily()
    const words = wordData.map(item => item.word)

    return (
        <div className={"justify-center"}>
            <Daily>
                <TodayWords>
                    <Suspense fallback={<Loading/>}>
                        <TodayWordsResult words={words}/>
                    </Suspense>
                </TodayWords>
                <div className={"2xl:flex-col 2xl:max-w-[58rem] pt-10 pb-20 px-2 gap-4.8 w-full h-full overflow-auto"}>
                    <Sentences>
                        <DailyTitle title={"Sentences"}/>
                        <SentencesResult words={words}/>
                    </Sentences>
                    <Article>
                        <DailyTitle title={"Article"}/>
                        <ArticleResult words={words}/>
                    </Article>
                </div>
            </Daily>
        </div>
    )
}