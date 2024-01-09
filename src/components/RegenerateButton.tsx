import React from "react";
import generateSentences from "@/app/(api)/generateSentences";
import {RegenerateIcon} from "@/components/Icon";
import generateArticle from "@/app/(api)/generateArticle";


interface RegenerateButton {
    words: string[]
    className: string
    setContents: React.Dispatch<React.SetStateAction<string>>
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    type: 'article' | 'sentences'
}

const RegenerateButton = ({words, className, type, setContents, setIsLoading}: RegenerateButton) => {

    const shuffleArray = (words: string[]) => {
        for (let i = words.length - 1; i > 0; i--) {
            // 0からiまでのランダムなインデックスを選択
            const j = Math.floor(Math.random() * (i + 1));
            // i番目とj番目の要素を交換
            [words[i], words[j]] = [words[j], words[i]];
        }
        return words;
    };

    const handleReload = async () => {
        setIsLoading(true)
        type === 'article' ? setContents(await generateArticle(shuffleArray(words))) : setContents(await generateSentences(shuffleArray(words)))
        setIsLoading(false)
    }

    return(
        <div className={className}>
            <button
                className={"group p-0.4 hover:bg-Brand-100 rounded-full"}
                onClick={handleReload}>
                <RegenerateIcon/>
            </button>
        </div>
    )
}

export default RegenerateButton