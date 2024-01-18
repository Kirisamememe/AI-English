import React from "react";

interface Meaning {
    children: React.ReactNode
    partOfSpeech: string
}

const Meaning = ({children, partOfSpeech}: Meaning) => {
    return (
        <ul className={
            `flex flex-col gap-1.6 text-[1.6rem] text-Gr-700 leading-[2rem] font-din font-semibold`
        }>
            <p>{partOfSpeech}</p>
            {children}
        </ul>
    )
}
export default Meaning