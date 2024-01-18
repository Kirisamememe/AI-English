import nlp from "compromise";
import React from "react";

const toParagraphs = (text: string) => {
    const getLemma = (word: string) => {
        const doc = nlp(word);
        return doc.verbs().toInfinitive().out('array')[0] || doc.nouns().toSingular().out('array')[0] || word;
    };

    return (
        <>
            {text.split('\n').map((paragraph, paraNum) =>
                <p key={`${paragraph}_${paraNum}`} className="mb-1.6 text-Gr-900 text-[1.6rem]">

                    {paragraph.split(/(\b|\s)/).map((token, wordNum) => {
                        if (/^\w+$/.test(token)) { // 単語のみにマッチする
                            const lemma = getLemma(token);
                            return  <React.Fragment key={`${lemma}-${paraNum}-${wordNum}`}>
                                        {" "}
                                        <span className={"hover:bg-Brand-200 cursor-pointer"}
                                              id={`${lemma}-${paraNum}-${wordNum}`}>{token}</span>
                                    </React.Fragment>
                        } else {
                            // 記号や空白の処理
                            return <React.Fragment key={`${token}-${paraNum}-${wordNum}`}>{token}</React.Fragment>;
                        }
                    })}

                </p>
            )}
        </>
    )
}

export default toParagraphs