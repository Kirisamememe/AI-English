import nlp from "compromise";

const toParagraphs = (text: string) => {
    const getLemma = (word: string) => {
        const doc = nlp(word);
        return doc.verbs().toInfinitive().out('array')[0] || doc.nouns().toSingular().out('array')[0] || word;
    };

    return (
        <>
            {
                text.split('\n').map((paragraph, paraNum) =>
                <p key={paraNum} className="mb-1.6 text-Gr-900 text-[1.6rem]">{paragraph.split(" ").map((word, wordNum) => (
                    <>
                        <span className={""} id={`${getLemma(word)}-${paraNum}-${wordNum}`}>{word}</span>
                        {" "}
                    </>
                ))}</p>)
            }
        </>
    )
}

export default toParagraphs