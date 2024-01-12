import {WordType} from "@/app/vocabList/WordList";
import React, {useEffect, useRef, useState} from "react";
import WordMainInfo from "@/app/vocabList/WordMainInfo";
import WordDetail from "@/app/vocabList/WordDetail";

const Word = ({wordInfo}: {wordInfo: WordType }) => {
    const [isSpread, setSpread] = useState(false)
    const detailRef = useRef<HTMLDetailsElement>(null);
    const isInitialMount = useRef(true);

    const definitionAndExample = wordInfo.meanings
        .flatMap((meaning) => meaning.definitions
            .map((definition) => ({
                definition: definition.definition,
                example: definition.example
            })))

    const handleClick = () => {
        setSpread(prev => !prev)
    }

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
                        duration: Math.max(detailRef.current.offsetHeight, 300) ,
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
                        duration: Math.max(detailRef.current.offsetHeight, 300),
                        easing: 'ease-in-out',
                    }
                );
                openDetails.onfinish = () => {
                    if (detailRef.current) detailRef.current.removeAttribute('open')
                }
            }
        }
    }, [isSpread]);


    return (
        <div onClick={handleClick}
             className={`relative group transition-all duration-200 flex-col w-[72rem] items-center hover:shadow-xl hover:ring-1 hover:ring-Brand-500 ${isSpread && 'ring-1 ring-Brand-400'} hover:shadow-Brand-100 rounded cursor-pointer`}>
            <WordMainInfo wordInfo={wordInfo} isSpread={isSpread}/>
            <WordDetail definitionAndExample={definitionAndExample} detailRef={detailRef} />
        </div>
    )
}

export default Word