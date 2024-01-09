import nlp from "compromise";
import React from "react";

const toParagraphs = (text: string) => {
    const getLemma = (word: string) => {
        const doc = nlp(word);
        return doc.verbs().toInfinitive().out('array')[0] || doc.nouns().toSingular().out('array')[0] || word;
    };

    return (
        <>
            {
                text.split('\n').map((paragraph, paraNum) =>
                <p key={crypto.randomUUID()} className="mb-1.6 text-Gr-900 text-[1.6rem]">{paragraph.split(" ").map((word, wordNum) => (
                    <React.Fragment key={`${getLemma(word)}-${paraNum}-${wordNum}`}>
                        <span className={""} id={`${getLemma(word)}-${paraNum}-${wordNum}`}>{word}</span>
                        {" "}
                    </React.Fragment>
                ))}</p>)
            }
        </>
    )
}

export default toParagraphs