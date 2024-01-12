import {WordType} from "@/app/vocabList/WordList";
import React from "react";
import PartOfSpeech from "@/app/vocabList/PartOfSpeech";
import ArrowIcon from "@/components/ArrowIcon";

const WordMainInfo = ({wordInfo, isSpread}: {wordInfo: WordType, isSpread: boolean}) => {
    return (
        <div id={"row1"} className={"flex w-full pl-2.4 justify-between items-center"}>

            {/*単語と発音など*/}
            <div id={"left"} className={"gap-1.2 items-center"}>
                <div className={"gap-0.8 items-center"}>
                    <span id={"word"} className={"text-[2rem] text-Gr-900 font-din font-semibold leading-none"}>
                        {wordInfo.word}
                    </span>
                    <div id={"partOfSpeech"} className={"gap-0.4"}>
                        {wordInfo.meanings
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
                <span id={"phonetic"} className={"text-[1.2rem] text-Gr-500"}>
                    {wordInfo.phonetic ? wordInfo.phonetic : ""}
                </span>
            </div>

            {/*アイコン*/}
            <div id={"right"} className={"size-5.6 justify-center items-center rounded-full"}>
                <ArrowIcon direction={`${isSpread ? 't' : 'b'}`} size={24}
                           className={"fill-Gr-500 group-hover:fill-Brand-950"}/>
            </div>
        </div>
    )
}

export default WordMainInfo