import {WordType} from "@/app/vocabList/WordList";
import React, {useEffect, useRef, useState} from "react";
import PartOfSpeechLabel from "@/app/vocabList/PartOfSpeechLabel";
import ArrowIcon from "@/components/ArrowIcon";
import updatePhonetic from "@/actions/updatePhonetic";

interface WordMainInfo {
    singleWord: WordType
    setWords: React.Dispatch<React.SetStateAction<WordType[]>>
    setSpread: React.Dispatch<React.SetStateAction<boolean>>
    children: React.ReactNode
}

const WordMainInfo = ({singleWord, setWords, setSpread, children}: WordMainInfo) => {
    const [prevPhonetic, setPrevPhonetic] = useState("")
    // const [elementWidth, setElementWidth] = useState<number>(0)
    // const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        setSpread(prev => !prev)
    }

    const handlePhoneticBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPhonetic = e.target.value.trim()

        if (newPhonetic !== prevPhonetic){
            updatePhonetic(Number(e.target.id) , e.target.value.trim())
                .then(() => console.log("発音記号を定義しました"))
                .catch(error => console.log(error))
        }
    }

    const changePhonetic = (e: React.ChangeEvent<HTMLInputElement>) => {
        const wordId = Number(e.target.id)

        setWords(prevState => prevState.map(word => (
            word.word_id === wordId ? {
                ...word,
                phonetic: e.target.value
            } : word)
        ))
    }

    const inputOnClick = (e: React.MouseEvent<HTMLInputElement>) => {
        e.stopPropagation();
        setPrevPhonetic(e.currentTarget.value)
    }

    return (
        <div id={"row1"} onClick={handleClick} className={
            "w-full pl-2.4 sm:pl-1.6 justify-between items-center cursor-pointer hover:bg-Brand-50 rounded"
        }>
            {/*単語と発音など*/}
            <div id={"left"} className={
                "gap-1.2 items-center"
            }>
                <div className={"gap-0.8 items-center"}>
                    <span id={"word"} className={
                        "text-[2rem] text-Gr-900 font-din font-semibold leading-none"
                    }>
                        {singleWord.word}
                    </span>
                    <div id={"partOfSpeech"} className={"gap-0.4"}>
                        {singleWord.meanings && singleWord.meanings
                            .map(meaning => meaning.partOfSpeech)
                            .filter((value, index, self) => self.indexOf(value) === index)
                            .map((partOfSpeech, index) => (
                                <React.Fragment key={`${partOfSpeech}_${index}_${singleWord.word}`}>
                                    <PartOfSpeechLabel partOfSpeech={partOfSpeech}/>
                                </React.Fragment>
                            ))
                        }
                    </div>
                </div>
                <input
                    id={`${singleWord.word_id}`}
                    name={"phonetic"}
                    type={"text"}
                    // ref={inputRef}
                    placeholder={"Click to input phonetic"}
                    className={"text-[1.2rem] text-Gr-500 border-none bg-transparent hover:text-Brand-950 hover:bg-Brand-50 placeholder:text-Gr-300 placeholder:hover:text-Brand-400 focus:text-Gr-900 focus:ring-2 focus:ring-Brand-900 rounded"}
                    value={singleWord.phonetic || ""}
                    onChange={changePhonetic}
                    onClick={inputOnClick}
                    onBlur={handlePhoneticBlur}
                    autoComplete={"off"}
                    size={16}
                />
            </div>
            {children}
        </div>
    )
}

export default WordMainInfo