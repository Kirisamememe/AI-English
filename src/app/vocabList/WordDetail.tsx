import React, {useState} from "react";
import {WordType} from "@/app/vocabList/WordList";
import AddDefinition from "@/app/vocabList/AddDefinition";
import Definition from "@/app/vocabList/Definition";
import Meaning from "@/app/vocabList/Meaning";
import AddMeaning from "@/app/vocabList/AddMeaning";
import Loading from "@/app/loading";

interface WordDetail {
    singleWord: WordType
    setWords: React.Dispatch<React.SetStateAction<WordType[]>>
    isFetching: boolean
    detailRef: React.Ref<HTMLDetailsElement>
}

export interface NewDefinition {
    definition_id: number
    definition: string
    example: string | null
    order: number | null
}

const WordDetail = ({singleWord, setWords, isFetching, detailRef}: WordDetail) => {

    const changeDefinitionOrExample = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const wordId = Number(e.currentTarget.id.split("_")[0])
        const meaningId = Number(e.currentTarget.id.split("_")[1])
        const definitionId = Number(e.currentTarget.id.split("_")[2])

        setWords(prevWords => prevWords.map (prevWordDetail => (
            prevWordDetail.word_id === wordId ?
            {
            ...prevWordDetail,
            meanings: prevWordDetail.meanings?.map(meaning =>
                meaning.meaning_id === meaningId ? {
                ...meaning,
                definitions: meaning.definitions.map(definition =>
                    definition.definition_id === definitionId
                        ? { ...definition, [e.target.name]: e.target.value }
                        : definition)
            } : meaning )
        } : prevWordDetail)))
    }

    // const addDefinition = (wordId: number, meaningId: number, newDefinition: NewDefinition) => {
    //     setWords(prevWords => prevWords.map( prevWordDetail => (
    //         prevWordDetail.word_id === wordId ?
    //         {
    //         ...prevWordDetail,
    //         meanings: prevWordDetail.meanings?.map(meaning =>
    //             meaning.meaning_id === meaningId ? {
    //                 ...meaning,
    //                 definitions: [...meaning.definitions, newDefinition]
    //         } : meaning)
    //     } : prevWordDetail)))
    //     setNewDefinition("")
    // }

    const removeDefinition = (wordId: number, meaningId: number, definitionId: number) => {
        setWords(prevWords => prevWords.map(prevWordDetail => (
            prevWordDetail.word_id === wordId ?
            {
            ...prevWordDetail,
            meanings: prevWordDetail.meanings?.map(meaning => (
                meaning.meaning_id === meaningId ?
                {
                ...meaning,
                definitions: meaning.definitions.filter(definition => definition.definition_id !== definitionId)
            } : meaning))
        } : prevWordDetail)))
    }

    return (
        <details ref={detailRef} id={"row2"} className={
            `flex flex-col w-full px-2.4 overflow-auto`
        }>
            <summary className={"text-transparent h-0"}></summary>
            { isFetching ?
                <Loading className={"mt-2 mb-3.2"}/> :
                <div className={
                    "flex-col mt-0.8 mb-2.4 mx-1.2 gap-3.2"
                }>
                    {singleWord.meanings?.map((meaning, index) => (
                        <Meaning key={`${meaning.meaning_id}_${singleWord.word}_${singleWord.word_id}`}
                                 partOfSpeech={meaning.partOfSpeech}>
                            {meaning.definitions.map((definition, index) => (
                                <Definition
                                    key={`${definition.definition_id}_${singleWord.word}_${singleWord.word_id}`}
                                    index={index}
                                    wordId={singleWord.word_id}
                                    meaningId={meaning.meaning_id}
                                    definitionId={definition.definition_id}
                                    definition={definition.definition}
                                    example={definition.example || ""}
                                    onChange={changeDefinitionOrExample}
                                    remove={removeDefinition}
                                />
                            ))}
                            <AddDefinition
                                index={meaning.definitions.length}
                                wordId={singleWord.word_id}
                                meaningId={meaning.meaning_id}
                                setWords={setWords}
                            />
                        </Meaning>
                    ))}
                    <AddMeaning/>
                </div>
            }
        </details>
    )
}

export default WordDetail