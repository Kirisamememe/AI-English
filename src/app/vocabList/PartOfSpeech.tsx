const PartOfSpeech = ({partOfSpeech}: {partOfSpeech: string}) => {

    const className: string = "px-0.4 text-white text-[1.2rem] font-din rounded-sm"

    switch (partOfSpeech) {
        case "noun":
            return <span className={`bg-noun ${className}`}>{partOfSpeech}</span>
        case "verb":
            return <span className={`bg-verb ${className}`}>{partOfSpeech}</span>
        case "adjective":
            return <span className={`bg-adjective ${className}`}>{partOfSpeech}</span>
        case "adverb":
            return <span className={`bg-adverb ${className}`}>{partOfSpeech}</span>
        case "conjunction":
            return <span className={`bg-conjunction ${className}`}>{partOfSpeech}</span>
        case "preposition":
            return <span className={`bg-preposition ${className}`}>{partOfSpeech}</span>
    }


}
export default PartOfSpeech