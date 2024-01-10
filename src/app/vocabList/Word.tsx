import {WordType} from "@/app/vocabList/WordList";
import React, {useEffect, useRef, useState} from "react";
import PartOfSpeech from "@/app/vocabList/PartOfSpeech";
import ArrowIcon from "@/components/ArrowIcon";

const Word = ({wordInfo}: {wordInfo: WordType }) => {
    const [isMounted, setIsMounted] = useState(false)
    const [isSpread, setSpread] = useState(false)
    const divRef = useRef<HTMLDetailsElement>(null);

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
        const firstLoad = () => {
            setIsMounted(true)
        }

        firstLoad()
    }, []);


    useEffect(() => {
        if (divRef.current) {
            if (isSpread && isMounted) {
                divRef.current.setAttribute('open', 'true')
                divRef.current.animate(
                    {
                        opacity: [0, 1],
                        height: ['0', `${divRef.current.offsetHeight}px`],
                    },
                    {
                        duration: 400,
                        easing: 'ease-in-out',
                    }
                );
            } else if(isMounted) {
                const openDetails =  divRef.current.animate(
                    {
                        opacity: [1, 0],
                        height: [`${divRef.current.scrollHeight}px`, '0'],
                    },
                    {
                        duration: 400,
                        easing: 'ease-in-out',
                    }
                );
                openDetails.onfinish = () => {
                    if (divRef.current) divRef.current.removeAttribute('open')
                }
            }
        }
    }, [isSpread]);


    return (
        <div onClick={handleClick}
             className={`relative group transition-all duration-200 flex-col w-[72rem] items-center hover:shadow-xl hover:ring-1 hover:ring-Brand-500 ${isSpread && 'ring-1 ring-Brand-400'} hover:shadow-Brand-100 rounded cursor-pointer`}>
            <div id={"row1"} className={"flex w-full pl-2.4 justify-between items-center"}>
                {/*単語と発音など*/}
                <div id={"left"} className={"gap-1.2 items-center"}>
                    <div className={"gap-0.8 items-center"}>
                        <span id={"word"}
                              className={"text-[2rem] text-Gr-900 font-din font-semibold leading-none"}>{wordInfo.word}</span>
                        <div id={"partOfSpeech"} className={"gap-0.4"}>
                            {
                                wordInfo.meanings
                                    .map(meaning => meaning.partOfSpeech)
                                    .filter((value, index, self) => self.indexOf(value) === index)
                                    .map(partOfSpeech => (
                                        <React.Fragment key={crypto.randomUUID()}>
                                            <PartOfSpeech partOfSpeech={partOfSpeech}/>
                                        </React.Fragment>
                                    ))
                            }
                        </div>
                    </div>
                    <span id={"phonetic"}
                          className={"text-[1.2rem] text-Gr-500"}>{wordInfo.phonetic ? wordInfo.phonetic : ""}</span>

                </div>

                {/*アイコン*/}
                <div id={"right"} className={"size-5.6 justify-center items-center rounded-full"}>
                    <ArrowIcon direction={`${isSpread ? 't' : 'b'}`} size={24}
                               className={"fill-Gr-500 group-hover:fill-Brand-950"}/>
                </div>
            </div>
            <div className={"w-full px-2.4"}>
                <details ref={divRef} id={"row2"} className={`flex flex-col w-full max-h-[48rem] overflow-auto`}>
                    <summary className={"text-transparent h-0"}></summary>
                    {

                        <ol className={"list-decimal flex flex-col mt-0.8 mb-2.4 mx-1.2 gap-1.2"}>
                            {definitionAndExample.map((item, index) => (
                                <li key={crypto.randomUUID()}
                                    className={`flex gap-0.4 w-[62rem] text-[1.6rem] text-Gr-700 leading-[2rem] font-din font-semibold`}>
                                    {index + 1}.
                                    <div className={"flex-col gap-0.6"}>
                                        {`${item.definition}`}
                                        <p key={crypto.randomUUID()}
                                           className={"text-Gr-500 text-[1.4rem] font-din font-normal leading-8"}>
                                            {`  ${item.example}`}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    }
                </details>
            </div>
            {/*<div className={"absolute w-full h-1.6 px-2 bg-white bottom-0.6 z-10"}></div>*/}
        </div>
    )
}

export default Word