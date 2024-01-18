
import {NewDefinition} from "@/app/vocabList/WordDetail";
import DefinitionContents from "@/app/vocabList/DefinitionContents";
import React, {useEffect, useRef} from "react";

interface AddDefinition {
    index: number
    wordId: number
    meaningId: number
    newDefinition: string
    setNewDefinition: React.Dispatch<React.SetStateAction<string>>
    addDefinition: (wordId:number, meaningId: number, newDefinition: NewDefinition) => void
}

const AddDefinition = ({index, wordId, meaningId, newDefinition, setNewDefinition, addDefinition}: AddDefinition) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const changeNewDefinition = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewDefinition(e.currentTarget.value)
    }

    // const handleOnKeyDownForAdd = (e: KeyboardEvent) => {
    //     if (e.key === 'Enter') textareaRef.current?.focus()
    //     console.log("キーが押された")
    // }
    //
    // useEffect(() => {
    //     window.addEventListener('keypress', handleOnKeyDownForAdd)
    //
    //     return () => {
    //         window.removeEventListener('keypress', handleOnKeyDownForAdd)
    //     }
    // }, [])


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
                    // onKeyDownRef={textareaRef}
                />
            </div>
        </li>
    )
}

export default AddDefinition