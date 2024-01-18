import React, {useEffect, useRef, useState} from "react";
import updateDefinition from "@/actions/updateDefinition";
import createDefinition from "@/actions/createDefinition";
import {NewDefinition} from "@/app/vocabList/WordDetail";

interface DefinitionContents {
    wordId: number
    meaningId: number
    definitionId: number
    dataType: 1 | 2
    data: string
    addDefinition?: (wordId:number, meaningId: number, newDefinition: NewDefinition) => void
    onChange: React.ChangeEventHandler
    removeCheck?: () => void
    onKeyDownRef?: React.RefObject<HTMLTextAreaElement>
}

const DefinitionContents = ({wordId, meaningId, definitionId, dataType, data, addDefinition, onChange, removeCheck, onKeyDownRef}: DefinitionContents) => {
    const [isEditing, setIsEditing] = useState(false)
    const [prevData, setPrevData] = useState("")
    const [elementHeight, setElementHeight] = useState<number>(0)
    const [isComposing, setIsComposing] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleMouseDown = (e: React.MouseEvent<HTMLParagraphElement>) => {
        setPrevData(data)
        setElementHeight(e.currentTarget.scrollHeight)
        setIsEditing(true)
    }

    const handleMouseUp = (e: React.MouseEvent<HTMLTextAreaElement>) => {
        e.currentTarget.focus()
    }

    // const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    //     setPrevData(data)
    //     setElementHeight(e.currentTarget.scrollHeight)
    // }

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        setIsEditing(false)
        const value = e.currentTarget.value

        if (definitionId !== 0){
            if (value.trim() !== prevData && (value.trim() !== '' || dataType === 2)){
                updateDefinition(dataType, definitionId, data)
                    .then(updatedDefinition => {
                        if (updatedDefinition){
                            console.log(dataType === 1 ? "定義を変更しました" : "例文を変更しました")
                            removeCheck && removeCheck()
                        }
                    })
                    .catch(error => {console.log(error)})
            }
            else if (value.trim() === '') {
                removeCheck && removeCheck()
            }
        }
        else if (value.trim() !== '') {
            createDefinition(meaningId, data)
                .then(newDefinition => {
                    addDefinition && addDefinition(wordId, meaningId, newDefinition)
                    setElementHeight(20)
                    console.log("定義を追加しました")
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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.shiftKey && e.key === 'Enter'){
            //デフォルトの改行動作
        }
        else if (e.key === 'Enter' && !isComposing){
            e.preventDefault();
            e.currentTarget.blur()
        }
    }

    // useEffect(() => {
    //     // 初期のテキストエリアの高さを設定
    //     if (textareaRef.current) {
    //         setElementHeight(textareaRef.current.clientHeight);
    //     }
    // }, []);

    const handleInput = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            const newHeight = textareaRef.current.scrollHeight
            textareaRef.current.style.height = `${newHeight}px`
            setElementHeight(newHeight)
        }
    }

    switch (dataType) {
        case 1:
            return (
                <>
                    {isEditing ?
                        <textarea id={`${wordId}_${meaningId}_${definitionId}`}
                                  name={"definition"}
                                  ref={textareaRef}
                                  style={{ height: `${elementHeight}px` }}
                                  className={"no-resize text-Gr-900 text-[1.6rem] w-full px-0.6 py-0.2 rounded-sm bg-BG-800 font-[500] leading-8 placeholder:text-Gr-300 ring-1 ring-Brand-600 border-none focus:border-none focus:ring-2 focus:ring-Brand-900"}
                                  placeholder={"input a definition"}
                                  value={data || ""}
                                  onChange={onChange}
                                  onBlur={handleBlur}
                                  onMouseUp={handleMouseUp}
                                  onKeyDown={handleKeyDown}
                                  onCompositionStart={handleCompositionStart}
                                  onCompositionEnd={handleCompositionEnd}
                                  onInput={handleInput}
                                  rows={1}
                                  spellCheck={true}
                        />
                        :
                        <>
                            <p onMouseDown={handleMouseDown}
                               className={"group/p px-0.6 py-0.2 leading-8 font-[500] hover:text-Brand-950 hover:bg-Brand-50 cursor-pointer rounded-sm"}>
                                {data || <span className={"text-Gr-500 group-hover/p:text-Brand-800"}>{">> Click to add a definition <<"}</span>}
                            </p>
                        </>
                    }
                </>
            )
        case 2:
            return (
                <>
                    {isEditing ?
                        <textarea id={`${wordId}_${meaningId}_${definitionId}`}
                                  name={"example"}
                                  ref={textareaRef}
                                  style={{ height: `${elementHeight}px` }}
                                  className={`no-resize text-Gr-700 text-[1.4rem] w-full px-0.6 py-0.2 rounded-sm bg-BG-800 font-[300] leading-8 placeholder:text-Gr-300 ring-1 ring-Brand-600 border-none focus:border-none focus:ring-2 focus:ring-Brand-900`}
                                  placeholder={"input an example"}
                                  value={data || ""}
                                  onChange={onChange}
                                  onBlur={handleBlur}
                                  onMouseUp={handleMouseUp}
                                  onKeyDown={handleKeyDown}
                                  onCompositionStart={handleCompositionStart}
                                  onCompositionEnd={handleCompositionEnd}
                                  onInput={handleInput}
                                  rows={1}
                                  spellCheck={true}
                        />
                        :
                        <>
                            <p onMouseDown={handleMouseDown}
                               className={"px-0.6 py-0.2 text-Gr-500 text-[1.4rem] font-[300] leading-8 hover:text-Brand-950 hover:bg-Brand-50 cursor-pointer rounded-sm"}>
                                {data || ">> Input an example <<"}
                            </p>
                        </>
                    }
                </>
            )
    }

    // switch (dataType) {
    //     case 1:
    //         return (
    //             <textarea id={`${meaningId}_${definitionId}_${Math.floor(Math.random() * (99999 - 1000) + 1000)}`}
    //                       ref={onKeyDownRef}
    //                       name={"definition"}
    //                       className={"no-resize text-Gr-700 hover:text-Brand-950 focus:text-Gr-900 text-[1.6rem] w-full px-0.6 py-0.2 rounded-sm bg-BG-800 hover:bg-Brand-50 focus:bg-BG-800 font-[500] leading-8 placeholder:text-Gr-500 placeholder:hover:text-Brand-950 placeholder:focus:text-Gr-300 border-none focus:border-none focus:ring-2 focus:ring-Brand-900"}
    //                       placeholder={"Add a new definition"}
    //                       value={data || ""}
    //                       onChange={onChange}
    //                       onBlur={handleBlur}
    //                       onFocus={handleFocus}
    //                       onKeyDown={handleKeyDown}
    //                       onCompositionStart={handleCompositionStart}
    //                       onCompositionEnd={handleCompositionEnd}
    //                       onInput={handleInput}
    //                       spellCheck={true}
    //             />
    //         )
    //     case 2:
    //         return (
    //             <textarea id={`${meaningId}_${definitionId}_${Math.floor(Math.random() * (99999 - 1000) + 1000)}`}
    //                       name={"example"}
    //                       className={`no-resize text-Gr-700 hover:text-Brand-950 focus:text-Gr-900 text-[1.4rem] w-full px-0.6 py-0.2 rounded-sm bg-BG-800 font-[300] leading-8 placeholder:text-Gr-300 border-none hover:bg-Brand-50 focus:bg-BG-800 focus:border-none focus:ring-2 focus:ring-Brand-900`}
    //                       placeholder={"input an example"}
    //                       value={data || ""}
    //                       onChange={onChange}
    //                       onBlur={handleBlur}
    //                       onFocus={handleFocus}
    //                       onKeyDown={handleKeyDown}
    //                       onCompositionStart={handleCompositionStart}
    //                       onCompositionEnd={handleCompositionEnd}
    //                       rows={elementHeight / 20}
    //                       spellCheck={true}
    //             />
    //         )
    // }
}
export default DefinitionContents