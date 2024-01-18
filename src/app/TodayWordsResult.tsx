'use client'

import {CheckedIcon, UncheckedIcon} from "@/components/CheckBoxIcon";
import {useEffect} from "react";

const TodayWordsResult = ({words}: { words: string[] }) => {

    const applySpecialStyle = (word: string) => {
        document.querySelectorAll(`span[id^="${word}"]`).forEach(element => {
            const htmlElement = element as HTMLElement;
            htmlElement.classList.add("border-b-0.2", "border-solid", "border-Brand-800", "bg-Brand-50", "font-semibold")
        });
    }

    const removeSpecialStyle = (word: string) => {
        document.querySelectorAll(`span[id^="${word}"]`).forEach(element => {
            const htmlElement = element as HTMLElement; // 型アサーション
            htmlElement.classList.remove("border-b-0.2", "border-solid", "border-Brand-800", "bg-Brand-50", "font-semibold")
        });
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, word: string) => {
        if (event.target.checked) {
            applySpecialStyle(word);
        } else {
            removeSpecialStyle(word);
        }
    };

    useEffect(() => {
        const highlight = () => {
            words.map(word => {
                applySpecialStyle(word)
            })
        }

        highlight()
    })

    return (
        <div className={"flex gap-0.6 flex-col overflow-auto"}>
            {words.map((word) => (
                <label key={word}
                     className={"group has-[:checked]:ring-1 has-[:checked]:ring-Brand-400 has-[:checked]:ring-inset has-[:checked]:text-Brand-950 has-[:checked]:bg-Brand-50 " +
                         "flex hover:bg-Brand-50 items-center " +
                         "h-4.8 min-h-4 gap-1.2 px-1.4 rounded-full " +
                         "text-[1.6rem] text-Gr-900 font-semibold font-din " +
                         "cursor-pointer"}>
                    <div className={"flex size-2.4 items-center justify-center cursor-pointer"}>
                        <input
                            className={"opacity-0 absolute h-0 w-0 peer"}
                            type={"checkbox"}
                            onChange={(event) => handleCheckboxChange(event, word)}/>
                        <CheckedIcon className={"checkedAnimation hidden peer-checked:block"}/>
                        <UncheckedIcon className={"peer-checked:hidden fill-Gr-900 group-hover:fill-Brand-950"}/>
                    </div>
                    {word}
                </label>
            ))}
        </div>
    )
}

export default TodayWordsResult