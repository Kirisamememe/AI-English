import React from "react";
import DefinitionContents from "@/app/vocabList/DefinitionContents";
import removeDefinition from "@/actions/removeDefinition";

interface Definition {
    index: number
    wordId: number
    meaningId: number
    definitionId: number
    definition: string
    example: string
    onChange: React.ChangeEventHandler
    remove: (wordId: number, meaningId:number, definitionId: number) => void
}

const Definition = ({index, wordId, meaningId, definitionId, definition, example, onChange, remove}: Definition) => {

    const handleRemoveDefinition = () => {
        if (definition.trim() === '' && example.trim() === ''){
            remove(wordId, meaningId, definitionId)
            removeDefinition(definitionId)
                .then(() => console.log("定義を削除しました"))
                .catch(error => console.log(error))
        }
    }

    return (
        <li className={"flex gap-0.2"}>
            <span className={"py-0.2"}>{index + 1}.</span>
            <div className={"flex-col gap-0.2 w-full"}>
                <DefinitionContents
                    wordId={wordId}
                    meaningId={meaningId}
                    definitionId={definitionId}
                    data={definition}
                    dataType={1}
                    onChange={onChange}
                    removeCheck={handleRemoveDefinition}
                />
                <DefinitionContents
                    wordId={wordId}
                    meaningId={meaningId}
                    definitionId={definitionId}
                    data={example || ""}
                    dataType={2}
                    onChange={onChange}
                    removeCheck={handleRemoveDefinition}
                />
            </div>
        </li>
    )
}

export default Definition