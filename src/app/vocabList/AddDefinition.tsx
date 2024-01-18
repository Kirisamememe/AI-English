
import {NewDefinition} from "@/app/vocabList/WordDetail";
import DefinitionContents from "@/app/vocabList/DefinitionContents";
import React, {useState} from "react";
import {WordType} from "@/app/vocabList/WordList";

interface AddDefinition {
    index: number
    wordId: number
    meaningId: number
    setWords: React.Dispatch<React.SetStateAction<WordType[]>>
}

const AddDefinition = ({index, wordId, meaningId, setWords}: AddDefinition) => {
    const [newDefinition, setNewDefinition] = useState<string>("")

    const changeNewDefinition = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewDefinition(e.currentTarget.value)
    }

    const addDefinition = (wordId: number, meaningId: number, newDefinition: NewDefinition) => {
        setWords(prevWords => prevWords.map( prevWordDetail => (
            prevWordDetail.word_id === wordId ?
                {
                    ...prevWordDetail,
                    meanings: prevWordDetail.meanings?.map(meaning =>
                        meaning.meaning_id === meaningId ? {
                            ...meaning,
                            definitions: [...meaning.definitions, newDefinition]
                        } : meaning)
                } : prevWordDetail)))
        setNewDefinition("")
    }

    return (
        <li className={"flex gap-0.2"}>
            <span className={"py-0.2 text-Gr-500"}>{index + 1}.</span>
            <div className={"flex-col gap-0.2 w-full"}>
                <DefinitionContents
                    wordId={wordId}
                    meaningId={meaningId}
                    definitionId={0}
                    data={newDefinition}
                    dataType={1}
                    addDefinition={addDefinition}
                    onChange={changeNewDefinition}
                />
            </div>
        </li>
    )
}

export default AddDefinition