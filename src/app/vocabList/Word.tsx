import {WordType} from "@/app/vocabList/WordList";
import React, {useEffect, useRef, useState} from "react";
import WordMainInfo from "@/app/vocabList/WordMainInfo";
import WordDetail from "@/app/vocabList/WordDetail";
import ArrowIcon from "@/components/ArrowIcon";
import {CloudIcon} from "@/components/Icon";
import fetchWordData from "@/actions/fetchWordData";
import insertWordData from "@/actions/insertWordData";
import Loading from "@/app/loading";

interface Word {
    wordInfo: WordType
    setWords: React.Dispatch<React.SetStateAction<WordType[]>>
}

const Word = ({wordInfo, setWords}: Word) => {
    const [isSpread, setSpread] = useState(false)
    const [isUndefined, setIsUndefined] = useState<boolean>(wordInfo.meanings ? wordInfo.meanings.length <= 0 : true)
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const detailRef = useRef<HTMLDetailsElement>(null);
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current){
            isInitialMount.current = false
        }
        else{
            if (detailRef.current && isSpread) {
                detailRef.current.setAttribute('open', 'true')
                detailRef.current.animate(
                    {
                        opacity: [0, 1],
                        height: ['0', `${detailRef.current.offsetHeight}px`],
                    },
                    {
                        duration: Math.min(Math.max(detailRef.current.offsetHeight, 300), 800) ,
                        easing: 'ease-in-out',
                    }
                );
            }
            else if (detailRef.current) {
                const openDetails =  detailRef.current.animate(
                    {
                        opacity: [1, 0],
                        height: [`${detailRef.current.offsetHeight}px`, '0'],
                    },
                    {
                        duration: Math.min(Math.max(detailRef.current.offsetHeight, 300), 800),
                        easing: 'ease-in-out',
                    }
                );
                openDetails.onfinish = () => {
                    if (detailRef.current) detailRef.current.removeAttribute('open')
                }
            }
        }
    }, [isSpread]);

    const handleFetchSingle = async (e: React.MouseEvent) => {
        e.stopPropagation()

        setIsFetching(true)
        setSpread(true)

        const singleWordData = await fetchWordData(wordInfo.word)
            .catch(error => {
                console.log(error)
                setIsFetching(false)
            })

        // console.log(JSON.stringify(singleWordData, null, 2))
        insertWordData(wordInfo.word_id, singleWordData)
            .then(() => {
                setWords(prevWordsData =>
                    prevWordsData.map(word => (
                        word.word === singleWordData.word ?
                            {...word,
                                phonetic: singleWordData.phonetic,
                                meanings: singleWordData.meanings} : word
                    ))
                )
                setIsUndefined(prev => !prev)
            })
            .catch(error => console.log(error))
            .finally(() => {
                setIsFetching(false)
            })
    }

    return (
        <div
             className={
            `relative group flex-col items-center max-h-svh
            hover:ring-1 hover:ring-Brand-500 sm:rounded-none
            rounded ${isSpread && 'ring-1 ring-Brand-400 shadow-xl shadow-Brand-100'}`
        }>
            <WordMainInfo singleWord={wordInfo} setWords={setWords} setSpread={setSpread}>
                <div className={"gap-1.2 items-center"}>
                    {isUndefined && (isFetching ?
                    <Loading className={"size-4"} size={24}/> :
                    <button id={"right_cloudIcon"}
                            className={"group/cloud flex size-4 justify-center items-center rounded-full hover:bg-Brand-50"}
                            onClick={handleFetchSingle}>
                        <CloudIcon/>
                    </button>)}
                    <div id={"right_arrowIcon"} className={"size-5.6 justify-center items-center rounded-full"}>
                        <ArrowIcon direction={`${isSpread ? 't' : 'b'}`} size={24}
                                   className={"fill-Gr-500 group-hover:fill-Brand-950"}/>
                    </div>
                </div>
            </WordMainInfo>
            <WordDetail
                singleWord={wordInfo}
                setWords={setWords}
                isFetching={isFetching}
                detailRef={detailRef}/>
        </div>
    )
}

export default Word