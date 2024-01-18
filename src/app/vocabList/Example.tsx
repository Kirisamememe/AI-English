import React, {useState} from "react";
import updateDefinition from "@/actions/updateDefinition";

interface Example {
    meaningId: number
    definitionId: number
    example: string
    onChange: React.ChangeEventHandler
}

const Example = ({meaningId, definitionId, example, onChange}: Example) => {
    const [isEditing, setIsEditing] = useState(false)
    const [prevExample, setPrevExample] = useState("")
    const [elementHeight, setElementHeight] = useState(20)


    const handleMouseDown = (e: React.MouseEvent<HTMLParagraphElement>) => {
        setPrevExample(example)
        setElementHeight(e.currentTarget.scrollHeight)
        setIsEditing(true)
    }

    const handleMouseUp = (e: React.MouseEvent<HTMLTextAreaElement>) => {
        e.currentTarget.focus()
    }

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        setIsEditing(false)
        if (e.currentTarget.value !== prevExample){

            //データベースに問い合わせる
            updateDefinition(2, definitionId, example)
                .then(updatedDefinition => {
                    if (updatedDefinition){

                        console.log("例文を変更しました")
                    }
                })
                .catch(error => {console.log(error)})
        }
    }

    return (
        <>
            {isEditing ?
                <textarea id={`${meaningId}_${definitionId}`}
                          name={"example"}
                          className={`no-resize text-Gr-700 text-[1.4rem] w-full px-0.6 py-0.2 rounded-sm bg-BG-800 font-din font-normal leading-8 placeholder:text-Gr-300 ring-1 ring-Brand-600 border-none focus:border-none focus:ring-2 focus:ring-Brand-900`}
                          placeholder={"input an example"}
                          value={example || ""}
                          onChange={onChange}
                          onBlur={handleBlur}
                          onMouseUp={handleMouseUp}
                          rows={elementHeight / 20}
                          spellCheck={true}
                />
                :
                <>
                <p onMouseDown={handleMouseDown}
                   className={"px-0.6 py-0.2 text-Gr-500 text-[1.4rem] font-din font-normal leading-8 hover:text-Brand-950 hover:bg-Brand-50 cursor-pointer rounded-sm"}>
                    {example || ">> click to input an example <<"}
                </p>
                </>
            }
        </>
    )
}

export default Example