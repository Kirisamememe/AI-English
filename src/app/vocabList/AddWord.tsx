import React, {useState} from "react";
import createWord from "@/actions/createWord";
import {WordType} from "@/app/vocabList/WordList";

const AddWord = ({addNewWord}: {addNewWord: (word: WordType) => void}) => {
    const [newWord, setNewWord] = useState("")
    const [isComposing, setIsComposing] = useState(false);

    const changeNewWord = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewWord(e.currentTarget.value)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && newWord.trim() !== "" && !isComposing) {
            createWord(newWord)
                .then(newWord => {
                    addNewWord(newWord)
                    console.log("単語を追加しました")
                    setNewWord("")
                })
                .catch(error => console.log(error))
        }
    }

    const handleCompositionStart = () => {
        setIsComposing(true);
    };

    const handleCompositionEnd = () => {
        setIsComposing(false);
    };

    return (
        <div className={"group transition-all bg-Brand-50 has-[:focus]:ring-2 has-[:focus]:bg-BG-800 justify-between items-center w-full px-2.4 mb-1 sm:pl-1.6 gap-1.2 h-5.6 ring-0 ring-Brand-900 rounded hover:bg-Brand-100"}>
            <input
                name={"newWord"}
                placeholder={"Add a new word"}
                className={"peer form-input w-full border-none outline-none text-Gr-900 font-semibold placeholder:font-normal px-0 placeholder:focus:text-Gr-300 placeholder:focus:group-hover:text-Gr-300 placeholder:group-hover:text-Brand-950  focus:ring-0 placeholder:text-Brand-600 bg-transparent text-[2rem] font-din leading-none rounded placeholder:transition-colors"}
                onKeyDown={handleKeyDown}
                value={newWord}
                onChange={changeNewWord}
                autoComplete={"off"}
                onCompositionStart={handleCompositionStart}
                onCompositionEnd={handleCompositionEnd}
            />
            <span className={"text-[1.4rem] shrink-0 font-semibold text-transparent peer-focus:text-Brand-900 "}>Press Enter to Add</span>
        </div>
    )
}

export default AddWord